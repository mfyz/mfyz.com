---
title: "Profiling and optimization on Facebook PHP SDK"
slug: profiling-and-optimization-on-facebook-php-sdk
date: 2012-12-26
url: http://mfyz.com/profiling-and-optimization-on-facebook-php-sdk/
tags: ["api","Back-End","facebook","opengraph","optimization","php","profiling","sdk"]
category: Back-End
migration: {"wpId":54,"wpPostDate":"2012-12-26T23:31:05.000Z"}
---

If you're developing PHP based Facebook application, you might want to use (or already using) Facebook integration little more than just authentication and identification of your user. Even if you have the simplest Facebook app and using PHP SDK, you probably have regularly done API calls.

You write your app and you start to see performance issues. You start to optimize your database interactions, PHP code optimization, after you done with your application optimization if you still have performance problems it's possibly from Facebook calls. Since you use SDK, you might not know what's happening with Facebook communication. So you want to do profiling between your app and Facebook API servers. You can add a basic timing profiling to your API calls to see how many calls you do, what kind of calls they are and how long they take to run. Let's dive in SDK, modify it a bit and start getting profiling information. Here is the actual method you need to modify in `base_facebook.php` file:

```php
public function api(/* polymorphic */) {
	$args = func_get_args();
	if (is_array($args[0])) {
		return $this->_restserver($args[0]);
	} else {
		return call_user_func_array(array($this, '_graph'), $args);
	}
}
```

and we're modifying it like this:

```php
$facebookApiCalls = array();
public function api( /* polymorphic */)
{
	$args = func_get_args();

	$time_start = microtime(true);

	if (is_array($args[0])) {
		$result = $this->_restserver($args[0]);
	} else {
		$result = call_user_func_array(array($this, '_graph'), $args);
	}

	$time_end = microtime(true);
	$time_elapsed = $time_end - $time_start;
	$time_elapsed *= 1000; //convert to millisecs

	if (isset($GLOBALS['facebookApiCalls'])) $GLOBALS['facebookApiCalls'][] = array(
		'duration' => $time_elapsed,
		'args' => $args,
	);
	return $result;
}
```

It simply appends a global array named "facebookApiCalls" and adds the API call details as "args" and timing as "duration". So at the end of your page logic code, you can print this information after sorting it by duration and you can also filter to show only slow ones (for instance, the ones took over 200 milliseconds).

After this profiling you can start to identify the slow calls, also if you do same calls multiple times because of recursing, recalls etc..., you can see and optimize, combine them.

This optimization is not only a performance tweak for the user, also it will decrease the number of calls made between your server and Facebook servers.
