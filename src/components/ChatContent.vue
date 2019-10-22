<template>
	<div class="chat-content has-background-light">
		<div class="supported-browser" v-if="supportedBrowser">
			<p>This is supported Browser</p>
		</div>
		<div class="not-supported-browser" v-else>
			<p>Tolong gunakan browser Chrome atau Firefox terbaru.</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ChatContent',
	props: {
		supportedBrowser: {
			type: Boolean,
			required: true
		}
	}
};
</script>

<style scoped>
.chat-content {
	border-bottom-right-radius: 15px;
	border-bottom-left-radius: 15px;
	height: 75vh;
}
</style>