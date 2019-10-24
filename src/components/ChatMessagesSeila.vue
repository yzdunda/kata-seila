<template>
	<div>
		<div class="chat-seila has-background-white-ter">
			<div class="if-error" v-if="apiResponse.data !== null">
				<div
					class="info-harga result"
					v-if="apiResponse.data.type == 'infoharga'"
				>
					<p><strong>Brand</strong>: {{ apiResponse.data.result.brand }}</p>
					<p>
						<strong>Tipe</strong>: {{ apiResponse.data.result.device_name }}
					</p>
					<p><strong>Kamera</strong>: {{ apiResponse.data.result.camera }}</p>
					<p><strong>OS</strong>: {{ apiResponse.data.result.os }}</p>
					<p><strong>Batere</strong>: {{ apiResponse.data.result.battery }}</p>
				</div>
				<div
					class="list-harga result"
					v-if="apiResponse.data.type == 'listharga'"
				>
					<ul
						v-for="(phone, index) in apiResponse.data.result.phones"
						:key="index"
					>
						<li>
							<p>
								{{ index + 1 }}. <strong>Tipe</strong>:
								<i>{{ phone.device_name }}</i>
								<br />
								<strong>Harga</strong>: {{ phone.price }} <br />
								<strong>OS</strong>: {{ phone.os }} <br />
								<strong>Processor</strong>: {{ phone.cpu }} <br />
								<strong>RAM/Memory</strong>: {{ phone.memory }}
							</p>
						</li>
					</ul>
				</div>
				<div
					class="banding-hp result"
					v-if="apiResponse.data.type == 'bandinghp'"
				>
					<div
						class="device-satu"
						v-if="
							apiResponse.data.result.sentiment1 >
								apiResponse.data.result.sentiment2
						"
					>
						<p>
							Kalau kata Seila sih mending
							<strong>{{ apiResponse.data.result.device1 }}</strong> daripada
							<strong>{{ apiResponse.data.result.device2 }}</strong>
						</p>
					</div>
					<div
						class="device-satu"
						v-if="
							apiResponse.data.result.sentiment2 >
								apiResponse.data.result.sentiment1
						"
					>
						<p>
							Kalau kata Seila sih mending
							<strong>{{ apiResponse.data.result.device2 }}</strong> daripada
							<strong>{{ apiResponse.data.result.device1 }}</strong>
						</p>
					</div>
				</div>
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
	data() {
		return {
			comparisonResult: ''
		};
	},
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

.result {
	font-size: 0.9em;
	padding: 10px;
}
</style>