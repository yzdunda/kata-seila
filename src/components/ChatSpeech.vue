<template>
	<div class="chat-reply has-background-white ">
		<button
			class="button is-primary"
			:class="{ 'animated infinite pulse': this.isLoading }"
			:disabled="!supportedBrowser"
			@click.stop="
				isLoading ? endSpeechRocognition() : startSpeechRecognition()
			"
			v-if="apiResponse.data == null"
		>
			<img
				class="is-rounded"
				src="../assets/microphone-icon.png"
				v-if="!isLoading"
			/>
			<scale-loader :loading="isLoading" :color="spinnerColor"></scale-loader>
		</button>
		<button
			class="button is-primary"
			@click="refreshClicked"
			v-if="apiResponse.data !== null"
		>
			<p>Lakukan permintaan ulang</p>
		</button>
	</div>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';

export default {
	data() {
		return {
			isLoading: false,
			spinnerColor: '#ffffff',
			error: false,
			recognition: null,
			isSpeaking: false,
			runtimeTranscript: '',
			sentences: []
		};
	},
	props: {
		supportedBrowser: {
			type: Boolean,
			required: true
		},
		lang: {
			type: String,
			default: 'id-ID'
		},
		text: {
			type: [String, null],
			required: true
		},
		apiResponse: {
			type: [Object, null],
			required: true
		}
	},
	components: {
		ScaleLoader
	},
	methods: {
		refreshClicked() {
			location.reload();
		},
		capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		startSpeechRecognition() {
			const recog = window.SpeechRecognition || window.webkitSpeechRecognition;
			let recognition = new recog();

			// eslint-disable-next-line no-console
			console.log('please speak.....');
			this.isLoading = true;
			recognition.lang = this.lang;
			recognition.interimResults = true;

			/* eslint-disable no-unused-vars */
			recognition.addEventListener('speechStart', e => {
				this.isSpeaking = true;
			});

			recognition.addEventListener('speechEnd', e => {
				this.isSpeaking = false;
			});
			/* eslint-enable no-unused-vars */

			recognition.addEventListener('result', e => {
				const text = Array.from(e.results)
					.map(result => result[0])
					.map(result => result.transcript)
					.join('');
				this.runtimeTranscript = text;
			});

			recognition.addEventListener('end', () => {
				if (this.runtimeTranscript !== '') {
					this.sentences.push(
						this.capitalizeFirstLetter(this.runtimeTranscript)
					);
					this.$emit(
						'update:text',
						`${this.text}${this.sentences.slice(-1)[0]}.. `
					);
				}
				this.runtimeTranscript = '';
				recognition.stop();
				if (this.isLoading) {
					recognition.start();
				}
			});

			recognition.start();
		},
		endSpeechRocognition() {
			const recog = window.SpeechRecognition || window.webkitSpeechRecognition;
			let recognition = new recog();

			recognition.stop();
			this.isLoading = false;
			// eslint-disable-next-line no-console
			console.log('recog stop working..');

			this.$emit('speechEnd', {
				sentences: this.sentences,
				text: this.sentences.join('. ')
			});
		}
	}
};
</script>

<style scoped>
.chat-reply {
	padding-top: 10px;
	padding-bottom: 10px;
}
.button {
	height: 100%;
}

img {
	width: 30px;
	height: auto;
}
</style>