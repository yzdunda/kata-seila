<template>
	<div class="chat-user has-background-white">
		<p>{{ text }}</p>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: [String, null],
			required: true
		}
	}
};
</script>

<style scoped>
.chat-user {
	text-align: right;
}
</style>