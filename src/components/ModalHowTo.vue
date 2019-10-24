<template>
	<div>
		<div class="modal has-text-left" :class="{ 'is-active': this.modal }">
			<div class="modal-background "></div>
			<div class="modal-content has-background-white">
				<div class="card">
					<div class="card-content">
						<div class="content">
							Cara Penggunaan Seila
							<ol>
								<li>Klik</li>
								<li>tunggu text</li>
								<li>Klik kembali</li>
								<li>Ulangi jika ingin mengulang</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
			<div
				class="modal-close is-large"
				aria-label="close"
				@click="closeModal"
			></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			modal: true
		};
	},
	methods: {
		closeModal() {
			this.modal = !this.modal;
		}
	}
};
</script>

<style scoped>
</style>