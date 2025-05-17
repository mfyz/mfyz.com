---
title: "dotfiles method to sync your command line configurations between machines"
slug: dotfiles-method-to-sync-your-command-line-configurations-between-machines
date: 2022-12-05
url: https://mfyz.com/?p=807
tags: ["bash","dotfiles","OS","shell"]
category: OS
migration: {"wpId":807,"wpPostDate":"2022-12-05T14:12:32.000Z"}
---

![](/images/archive/en/2022/12/dotfiles-sync.png)

I want to talk about a common practice among developers who work on multiple machines or work on (many) servers. As developers, we spend a healthy amount of our time on the shell and work with command line tools. If you fit in this description, it is important to configure your shell to your own liking.

Then comes the question, of how to keep this configuration in sync between devices or servers. I will talk about the common method called dotfiles to store, push and pull the changes of these files (or collection of them). You may be familiar with this method but I’ll talk about my own setup after giving some context. I hope you can find bits and pieces of helpful tricks I implemented on my own version. But you can search dotfiles in github and find thousands of other developers to explore different flavors of personal configurations. Most developers make these configuration files public. You can find my dotfiles repo here: [](https://github.com/mfyz/dotfiles)[https://github.com/mfyz/dotfiles](https://github.com/mfyz/dotfiles)

## Configuration Files

Most of the command line apps we use save their configuration in the user's home folder as a single configuration file or a folder with a dot prefix which makes the files/folders hidden by default file browsing apps and commands.

This makes the configuration of each tool, extremely portable. Basically copying this file between machines will give you exact replica of your tool configuration everywhere. Well, almost always. Some tools may require additional activation steps like installing vim plugins or planning multiple files.

## How to collect them in one place?

The main trick of this method is to keep the original files under a single folder, generally

```
.dotfiles

```

in your home directory:

```
/home/myuser/.dotfiles/

```

Then link the original files to their final locations. Instead of manually linking them we’ll be using a utility for this.

Then this folder can be git managed and pushed to a remote repo. As I mentioned, a lot of developers make their dotenv configurations public. So you can push your dotfiles folder to github privately or publicly. If you are publicly pushing, you need to make sure there is no secure tokens included in your dotfiles. Read Security section below about this, that I’ll be talking about how to separate your secrets and store in a private repo that you can also make similar dotfiles-secrets repo and replication process between machines.

## How to restore them to the right place in a new machine?

We’ll be using a utility called GNU Stow. Stow is a simple command that simply links files under a folder to your home directory. For example, if you have one or more configuration file for your zsh configuration like

```
.zshrc

```

file, you put it in a folder (can be any name) like “zsh”. Then running the command

```
stow zsh

```

anywhere will link the contents of zsh folder into the home directory.

You can collect all apps configurations in different folders under your .dotfiles folder. Then run stow for each folder. Or instead automate it something like:

```
for d in $(ls -d \*/ | cut -f1 -d '/' | grep -v '^\_');
do
    ( stow "$d"  )
done

```

Further more, you can automate the whole installation steps:

*   clone the github repo, so you have local copy
*   install gnu stow using the operating system’s package manager
*   walk all directories and run stow command that will link files to the root folder.

The final installation script will look like this:

```
#!/bin/bash

if \[\[ -e /etc/debian\_version \]\]; then
    OS=debian
elif \[\[ "$OSTYPE" == "darwin"\* \]\]; then
    OS=macos
elif  ! command -v stow >/dev/null 2>&1; then
    OS=notfound
else
    echo "Please install stow manually then try again."
    exit
fi
if \[\[ "$OS" = 'debian' \]\]; then
    sudo apt-get install -y stow
elif \[\[ "$OS" = 'macos' \]\]; then
    brew install stow
fi

git clone <https://github.com/mfyz/dotfiles.git> ~/.dotfiles
cd ~/.dotfiles || exit
for d in $(ls -d \*/ | cut -f1 -d '/' | grep -v '^\_');
do
    ( stow "$d"  )
done
echo 'Congrats, you are done, Enjoy!'

```

## Securing your secrets

It’s very important NOT to push your secrets/tokens that generally make its way to rc files like .zshrc, or .bashrc. Instead, we will be moving all token/secret export commands to a separate file and repository that you can privately push and sync between machines with a similar method.

I’ve been using the name dotfiles-secrets for my repo and the name of the script.

The way it works is simply to put a folder

```
.dotfiles-secrets

```

then place all exports of tokens and secrets to a shell file called

```
secrets.sh

```

and push that to a separate private repo. Then git clone that repo manually to your home folder.

In my regular .dotfiles repo, my shell rc file (I use zsh, therefore it is

```
.zshrc

```

file for me), we have the following block that checks the

```
.dotfiles-secrets/secrets.sh

```

file and executes if the file exists.

```
\# secrets
SECRETS\_FILE="$HOME/.dotfiles-secret/secrets.sh"
if test -f "$SECRETS\_FILE"; then
  source $SECRETS\_FILE
fi

```

This way, we gracefully do not give any error if you only want to clone the configuration files and not have your secrets.