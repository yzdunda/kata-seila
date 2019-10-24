<template>
	<div>
		<modal></modal>
		<div class="chat-container columns is-centered">
			<div class="column is-mobile is-half has-text-centered">
				<!-- <p>text: {{ text }}</p>
			<p>sentences: {{ sentences }}</p>
			<p>sentences length: {{ sentencesLength }}</p> -->
				<chat-header></chat-header>
				<chat-content
					:supportedBrowser="supportedBrowser"
					:text="text"
					:loadingResponse="loadingResponse"
					:apiResponse="apiResponse"
				></chat-content>
				<chat-speech
					:supportedBrowser="supportedBrowser"
					:text.sync="text"
					@speechEnd="speechEnd"
					:apiResponse="apiResponse"
				></chat-speech>
			</div>
		</div>
	</div>
</template>

<script>
import Axios from 'axios';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import ChatSpeech from './ChatSpeech';
import Modal from './ModalHowTo';

export default {
	name: 'ChatContainer',
	components: {
		ChatHeader,
		ChatContent,
		ChatSpeech,
		Modal
	},
	data() {
		return {
			supportedBrowser: false,
			text: '',
			sentences: null,
			sentencesLength: null,
			loadingResponse: false,
			apiResponse: {
				data: null
			}
		};
	},
	methods: {
		checkSpeechRecognition() {
			if (window.SpeechRecognition || window.webkitSpeechRecognition) {
				this.supportedBrowser = true;
			}
		},
		speechEnd({ sentences, text }) {
			this.getPrediction(text);
			// eslint-disable-next-line no-console
			console.log('text: ', text);
			// eslint-disable-next-line no-console
			console.log('sentences: ', sentences);
			// eslint-disable-next-line no-console
			console.log('sentences length: ', sentences.length);
			this.sentences = sentences;
			this.sentencesLength = sentences.length;
		},
		getPrediction(text) {
			this.loadingResponse = true;

			Axios.post(`https://djasayuapi.herokuapp.com/app?text=${text}`)
				.then(response => {
					// eslint-disable-next-line no-console
					console.log('api response: ', response.data);
					this.apiResponse.data = response.data;

					this.loadingResponse = false;
				})
				.catch(err => {
					// eslint-disable-next-line no-console
					console.log('error: ', err);
					this.apiResponse.data = null;
				});
		}
	},
	created() {
		this.checkSpeechRecognition();
	}
};
</script>

<style scoped>
.chat-container {
	margin-top: 1%;
}
</style>