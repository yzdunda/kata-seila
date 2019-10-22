<template>
	<div class="chat-container columns is-centered">
		<div class="column is-mopbile is-half has-text-centered">
			<chat-header></chat-header>
			<chat-content :supportedBrowser="supportedBrowser"></chat-content>
			<chat-reply
				:supportedBrowser="supportedBrowser"
				:text.sync="text"
				@speechEnd="speechEnd"
			></chat-reply>
		</div>
	</div>
</template>

<script>
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import ChatReply from './ChatReply';

export default {
	name: 'ChatContainer',
	components: {
		ChatHeader,
		ChatContent,
		ChatReply
	},
	data() {
		return {
			supportedBrowser: false,
			text: '',
			sentences: null
		};
	},
	methods: {
		checkSpeechRecognition() {
			if (window.SpeechRecognition || window.webkitSpeechRecognition) {
				this.supportedBrowser = true;
			}
		},
		speechEnd({ sentences, text }) {
			// eslint-disable-next-line no-console
			console.log('text', text);
			// eslint-disable-next-line no-console
			console.log('sentences', sentences);
			this.sentences = sentences;
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