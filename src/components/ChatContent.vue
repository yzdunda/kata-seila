<template>
	<!-- TODO: error handling -->
	<div class="chat-content has-background-white">
		<div class="supported-browser" v-if="supportedBrowser">
			<div class="if-not-started animated infinite bounceIn slow" v-if="!text">
				<p>Silakan klik tombol dibawah untuk memulai</p>
			</div>
			<div class="if-started">
				<chat-messages-user
					:text="text"
					:apiResponse="apiResponse"
				></chat-messages-user>
				<chat-messages-seila
					:loadingResponse="loadingResponse"
					:apiResponse="apiResponse"
				></chat-messages-seila>
			</div>
		</div>
		<div class="not-supported-browser" v-else>
			<p>Tolong gunakan browser Chrome atau Firefox terbaru.</p>
		</div>
	</div>
</template>

<script>
import ChatMessagesUser from './ChatMessagesUser';
import ChatMessagesSeila from './ChatMessagesSeila';

export default {
	name: 'ChatContent',
	components: {
		ChatMessagesUser,
		ChatMessagesSeila
	},
	props: {
		supportedBrowser: {
			type: Boolean,
			required: true
		},
		text: {
			type: [String, null],
			required: true
		},
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
.chat-content {
	border-left: 1px solid lightgrey;
	border-right: 1px solid lightgrey;
	border-bottom: 1px solid lightgrey;
}
</style>