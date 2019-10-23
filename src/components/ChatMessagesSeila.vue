<template>
	<div>
		<div class="chat-seila has-background-white-ter">
			<div class="if-error" v-if="apiResponse.data !== null">
				<p>{{ apiResponse.data }}</p>
			</div>
			<div class="if-not-error" v-else>
				<p>{{ apiResponse.Error }}</p>
			</div>
		</div>
		<pulse-loader :loading="loadingResponse"></pulse-loader>
	</div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
	components: {
		PulseLoader
	},
	props: {
		loadingResponse: {
			type: Boolean,
			required: true
		},
		apiResponse: {
			type: [Object, null],
			required: true
		}
	}
};
</script>

<style scoped>
.chat-seila {
	text-align: initial;
}
</style>