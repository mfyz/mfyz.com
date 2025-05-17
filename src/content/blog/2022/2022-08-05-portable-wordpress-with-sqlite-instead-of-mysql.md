---
title: "Portable Wordpress with SQLite instead of MySQL"
slug: portable-wordpress-with-sqlite-instead-of-mysql
date: 2022-08-05
url: https://mfyz.com/?p=765
tags: ["Programming","wordpress"]
category: Programming
migration: {"wpId":765,"wpPostDate":"2022-08-05T12:03:08.000Z"}
---

![](/images/archive/en/2022/08/Wordpress20SQLite.jpg)

When working with WordPress, there are many occasions you may need a quick spin WordPress environment without dealing with database setup and a web server.

Making WordPress use a SQLite database and run on a native PHP server is surprisingly easy and simple.

I’ve been using this setup for testing plugins, and themes and trash the setup without worrying about it much.

The magic here is mostly automating the installation and configuration of the WordPress instance using wp-cli. It’s very easy to install and run wp-cli from a phar package.

```
\# Install wp-cli
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar

# Set up wordpress site
php wp-cli.phar core install
		--url=http://localhost:8011
		--title='Test Site'
		--admin\_user=admin
		--admin\_password=admin
		--admin\_email=test@example.com
		--skip-email

# Tweaking wordpress settings
php wp-cli.phar rewrite structure '/%postname%/' --hard
php wp-cli.phar option update page\_for\_posts 10

# Installing and activating plugins
php wp-cli.phar plugin install kirki --activate

# Installing and activating theme
php wp-cli.phar theme activate mytheme

# Creating sample content
php wp-cli.phar post create --post\_type=post --post\_title='A sample post'
```

You can get the full installer and configuration script here: [https://github.com/mfyz/wp-sqlite-installer](https://github.com/mfyz/wp-sqlite-installer)