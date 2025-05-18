---
title: "Integration and verification of iOS In-App Purchases"
slug: integration-and-verification-of-ios-in-app-purchases
date: 2013-01-03
url: http://mfyz.com/integration-and-verification-of-ios-in-app-purchases/
tags: ["app store","apple","Back-End","in-app purchase","integration","ios","ipad","iphone","itunes","itunes connect","php","purchase","server","store","storekit","verification"]
category: Back-End
migration: {"wpId":55,"wpPostDate":"2013-01-03T09:02:36.000Z"}
---

![](/images/archive/en/2020/05/in-app-purchases_e7nqtz.png?fit=177%2C196&ssl=1) Economy models in iOS apps use In-App purchases become very popular. Lots of developers pick iOS environment because of the flawless payments through iTunes.

If you're planning to have a monetization model in your app, it has to go through Apple system and you have to use in-app purchases. There is no other way to accept payments from your iOS apps. There are pros and cons of using Apple in-app purchases. I'll try to explain some of them.

The biggest con is Apple takes 30% of your sale. And another con is, there are difficulties and grayed areas in the integration of in-app purchases to your app and back-end. But the pros make all even. Because delegating whole payments to Apple is gonna affect your sales because Apple makes it so seamless that it reduces all money related steps to only one confirmation box. So it changes the purchase experience and makes it what it supposed to be. Most of the checkout or payment experiences on web, faces lots of drops because of unnecessary and boring steps like putting your credit card info, trying to give the trust to user that you're a legitimate company and have legitimate payment system that you will not sell their info out or you won't let hackers to pick your customer info up. All those buying experience changed in iTunes payments. So this is why you should want to integrate in-app purchases.

Let's dive into the integration. You have to use StoreKit which is an interface in iOS that handles all iTunes and payments. I won't talk about objective-c integration of StoreKit, I will just explain what's to do there.

After integration of StoreKit, when user triggers a payment (with tapping a button or something like that) you call StoreKit and iOS shows a confirmation box of your product, price and after that user confirms their iTunes password and StoreKit gives you a "receipt-data" object which is an encoded string holds the receipt details. You don't need to worry about what's in it or how to decode it because you won't need. You just need that receipt-data to verify and get all details from Apple. At this point, you need to verify this receipt-data with using their HTTP method.

Some amateur developers don't feel the necessity of verifying the receipts they received from StoreKit. But the problem is, there are lot's of easy ways to hack this and jailbroken devices can create fake receipts. So if you don't validate and if you assume you received your payment with whenever you receive a receipt from StoreKit, you may see misuses of your paid content. One other reason to validate is, you might want to (and you should) keep a record of your purchases and their statuses (valid or invalid). So I highly recommend you to do a back-end integration to keep track of records and also verification.

#### Verifying receipts in your back-end

Apple provides a protocol to validate receipts. There is an HTTP service that you can send your receipts data and it returns the payment details in JSON format. You have to have a developer key in order to use this HTTP service. You can grab your developer key from iTunes Connect interface.

Here is a helper method for PHP powered apps:
```
function validate_receipt($receipt_data, $sandbox_receipt = FALSE) {
	if ($sandbox_receipt) {
		$url = "https://sandbox.itunes.apple.com/verifyReceipt/";
	}
	else {
		$url = "https://buy.itunes.apple.com/verifyReceipt";
	}

	$ch = curl_init($url);

	$data_string = json_encode(array(
		'receipt-data' => $receipt_data,
		'password' => '<>',
	));

	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Content-Length: ' . strlen($data_string))
	);

	$output = curl_exec($ch);
	$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

	curl_close($ch);

	if (200 != $httpCode) {
		die("Error validating App Store transaction receipt. Response HTTP code $httpCode");
	}

	$decoded = json_decode($output, TRUE);
	return $decoded;
}
```
This method used to send and receive the receipt details to Apple validation servers. As you can see, there are two different servers. One for the live app, another one is for your app in development which called Sandbox. You need to convey the information of your app is in development mode or live app over your API. So you have to send each receipt to correct servers in order to get verification result. If your app distribution is not for App Store when you build, all StoreKit calls will run in Sandbox mode which you'll see a notice in all confirmation boxes of purchases. This scenario includes apps running on iOS simulator, compiled directly from XCode to your device, or even TestFlight builds. You need to use sandbox users to make purchases in sandbox mode. There is an interface in iTunes Connect to create sandbox users.

Anyway, if you're trying to validate a sandbox receipt, you can define it as a boolean in the second parameter of that function. This function simply will create an HTTP request and it will return the JSON result as an array if the HTTP response code is 200.

Here is the response JSON object:
```
{
	"receipt":{
		"original_purchase_date_pst":"2012-12-11 19:39:22 America/Los_Angeles",
		"unique_identifier":"130f26a2d4f02b6ec66a44e6d0d1054a0c67b31d",
		"original_transaction_id":"900010202504325481451",
		"bvrs":"2.0",
		"app_item_id":"469944437",
		"transaction_id":"2390034200035752112451",
		"quantity":"1",
		"unique_vendor_identifier":"A6CF45BAC2347-E21D-4827-D14D52A43240",
		"product_id":"com.moonit.moonit.starpower800",
		"item_id":"5756897490",
		"version_external_identifier":"11723464",
		"bid":"com.moonit.moonit",
		"purchase_date_ms":"1355283562408",
		"purchase_date":"2012-12-12 03:39:22 Etc/GMT",
		"purchase_date_pst":"2012-12-11 19:39:22 America/Los_Angeles",
		"original_purchase_date":"2012-12-12 03:39:22 Etc/GMT",
		"original_purchase_date_ms":"1355283562408"
	},
	"status":0
}
```
The first thing you need to check is "status" code. This is the return code is the result of verification. If this code is "0" (zero) means everything is ok and receipt is valid. If not, here is the all the possible return codes and meanings (This is copied from Apple developer documentation):
```
21000 The App Store could not read the JSON object you provided.
21002 The data in the receipt-data property was malformed.
21003 The receipt could not be authenticated.
21004 The shared secret you provided does not match the shared secret on file for your account.
21005 The receipt server is not currently available.
21007 This receipt is a sandbox receipt, but it was sent to the production server.
21008 This receipt is a production receipt, but it was sent to the sandbox server
```
Back to JSON response object above. You may think you will get one unique transaction_id value for each payment. But in practice, it doesn't necessarily one transaction for one payment. In some cases, StoreKit triggers its callback method multiple times (sometimes even more than 5 times) and all of them will have different receipt-data and different transaction ids. So you need to use original_transaction_id to understand all of them stands for one payment. I recommend you to keep the record of other transactions as well. Save the receipt-data in your database, in that case, you can re-validate whenever you want. But if you have problems to capture receipt-data form client (which is your app) that will be a problem on user's end.

Response object also contains some information about, the product identifier that user purchased (you may have multiple products in your app, or same product with different price points, but in iTunes Connect all of them will be treated as different products), purchase time, purchased app version etc... I also recommend you to store this response object as it is in your database as of verification result. You might want to use it for your analytics or revenue calculation.

This purchase scenario I gave above is about one-time purchase of a consumable product. You might not familiar with the concept of the different type of purchasable products. Here is the explanation.

When you want to create a new product, you need to create that product details in iTunes Connect, there all of your products have to be approved by Apple with a binary app submission which requires that you prepare your products with your app update.

When you try to define a product, you need to decide what type of product it will be. Also, Apple has a strict rule of using these types appropriately, which if you pick the wrong type of product, your submission might be rejected. Here are the product types:

*   Consumable product: Users can purchase this product multiple times. For instance, a consumable resource in a game that users can keep purchase and add more resources (Product: "500 Gold", you can deplete your golds in the game and purchase as you need, or even if you don't need you can still pay and add more).
*   Non-consumable product: These products are only purchased one time. They can't be purchased it again. For instance, a feature or a goodie user can possess (Product: "Super powered sword", when the user purchases this sword, they possess it, they don't need to (and can't) re-own it).
*   Non-recurring subscription.
*   Reoccuring subscription: Last two products are for subscriptions. The only difference between them are, the reoccurring one does repeating auto payments. User subscribes and in every period, it processes automatic payments without requiring user's action. This happens until user cancels the subscription through iTunes.

If you're providing an ongoing service like membership or subscription to a fresh content, Apple requires you to use a subscription product type. If your service is not ongoing service, if it's one-time service, Apple wants you to use regular consumable or non-consumable product types. Apple rejects wrong defined product types.

Integration of subscription based payments are slightly differed in the getting auto-paid receipts part. It has its own challenges and I will explain them in another article.

You can track your sells by products and other high-level insights in iTunes Connect but it's very summarized. Also if you have a user base, you might want to see which user did payments and how many of what demographic is paying more or that kind of deep analysis. In that case, you have to store and validate your receipts and process all responses with a well-done integration.