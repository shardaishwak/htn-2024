export default async function getAddress(signer) {
	const address = await signer.getAddress();

	console.log("[Wallet]", "Address", address);
	return address;
}
