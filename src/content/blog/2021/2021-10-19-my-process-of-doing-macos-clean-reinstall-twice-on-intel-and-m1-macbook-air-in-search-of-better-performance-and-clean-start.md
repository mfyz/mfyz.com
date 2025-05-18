---
title: "My process of doing macOS clean (re)install twice on Intel and M1 Macbook Air - In search of better performance and clean start"
slug: my-process-of-doing-macos-clean-reinstall-twice-on-intel-and-m1-macbook-air-in-search-of-better-performance-and-clean-start
date: 2021-10-19
url: https://mfyz.com/?p=703
tags: ["homebrew","m1","macos","nodejs","OS"]
category: OS
migration: {"wpId":703,"wpPostDate":"2021-10-19T14:00:00.000Z"}
---

![by Remy_Loz](/images/archive/en/2021/10/3S0INpfREQc.jpg)

by Remy_Loz

Before I upgraded to the new M1 machine, I was having a lot of speed issues with my previous Intel Macbook Pro. A month before giving up and buying a new M1 MacbookAir, I suspected that the macOS installation and apps/tools I installed over many years were perhaps the sources of the speed issues. I backed everything up and planned a clean re-install on the Intel Macbook Pro. End result is not seeing the speed lift I expected and finally giving in to buy a new M1 Macbook Air which has been amazing as far as the speed I wanted from my computer.

I wanted to write about my process of perfecting my process of setting up a brand new machine (or a reinstalled OS) as quickly as I can with restoring critical tools’ settings I use often.

Here is the todo list I created for myself for this whole operation:

*   Make Lists of Applications
    *   Make List of homebrew packages installed
    *   Make List of npm packages installed
*   Backup application configurations
*   Make List of git repositories
    *   Push all repositories
*   Push .dotenv and .dotenv-secret
*   Backup SSH keys (also onto 1password)
*   Backup all .env files
*   Backup to (SSD)
    *   Application configuration folders
    *   Development folder
    *   Home & Library folders (tar)
*   Backup `~/.config` `~/.aws` and similar credentials files/folders

## Backups

I use an [external SSD disk](https://www.amazon.com/SanDisk-1TB-Extreme-Portable-SDSSDE61-1T00-G25/dp/B08HN37XC1) to store my backups. I actually take regular backups with a script I created. As simple as plugging in the SSD disk, run a bash script, and all done in under 5 minutes and I’m usually done.

Here is the script I run: [https://gist.github.com/mfyz/087379eb77ec8581b665e234de238ee1](https://gist.github.com/mfyz/087379eb77ec8581b665e234de238ee1)

Things I do regular backups using this script:

*   App settings (~/Library/Application Support)
*   Dropbox content x2 (Personal + Work)
*   Development folder
*   Databases

### Can you live without these tools you were using before? Or can you find open-source alternatives, or better paid alternatives?

Before installing any new app. This is actually a great opportunity to re-evaluate your relationship with all the tools/apps you use daily basis. Breaking digital habits is hard. Especially if you have everything set up already. But clean install is probably the best time to re-evaluate how much value each app is bringing to your day-to-day and the cost of using system resources on your computer. I have asked the same question and tentatively came up with the following list to use alternatives of the apps/tools I was using. A surprising amount of them had open-source alternatives so I could support the open source community as well as not need to pay or worry about proprietary licenses of the apps I was using.

## Day to day tools

### Installing Usual Tools

Using homebrew + using cask to install usual tools. Here is the partial list of the apps I installed with just running the following command:

```
brew install --cask zoom  
brew install --cask android-studio  
brew install --cask charles  
brew install --cask docker  
brew install --cask grammarly  
brew install --cask imageoptim  
brew install --cask little-snitch  
brew install --cask miro  
brew install --cask krisp  
brew install --cask noun-project  
brew install --cask postman  
brew install --cask robo-3t  
brew install --cask skype  
brew install --cask transmission  
brew install --cask transmit  
brew install --cask tunnelblick  
brew install --cask virtualbox  
brew install --cask vlc  
brew install --cask zoom  
brew install --cask jdiskreport
```

Keep in mind that this will take a long, download and install all apps. This is a great way to document the apps you use that can be

### Alfred

I use Alfred extensively. I have tons of keyword shortcuts web URLs that launch chrome with a few key taps in Alfred search. Some are query-based searches. I also have a ton of script and keyboard shortcuts configured as workflows. I even store my code snippets in Alfred so they are kinda universal through apps and computers. All mac apps’ configuration is both backed up and restored in a generic way, where all the specific application settings are residing under `~/Library/Application Support` base folder. Each app has its own folder there and data/settings structured in their own way under these folders. I generally back up these folders in my regular backups. I simply restore the application I want to copy settings from my old mac.

## Development apps/tools

### Bash, aliases, ZSH, dotfiles

I manage my shell environment configuration and the configuration of the tools I use in the shell using a practice called `dotfiles`. What it means is a lot of people share their shell configuration files publicly in github with help of a few open-source tools that can easily link the configuration files in the right places.

You can find my dotfiles repo here: [https://github.com/mfyz/dotfiles](https://github.com/mfyz/dotfiles)

I generally don’t use the install script and manually clone the repo in new machines and manually run the install script. The script itself is pretty plain and simple. It clones the repo locally to .dotfiles folder in the home directory and loops through the folders and run “stow” command which links the files under each folder to the related shell application’s configuration paths. Stow knows almost all shell applications target locations and create symbolic links of your files to the target locations. So you continue editing your ~/.dotfiles files and keep pushing your changes to github (or any other VCS) over time.

Dotfiles can include any file actually but here are the famous ones that help me ground up a brand new shell environment with a couple of steps. I often use this approach to configure an SSH environment I’ve given access to on a server that I will be working on more frequently.

*   bashrc or [zshrc](https://github.com/mfyz/dotfiles/blob/master/zsh/.zshrc)
*   [my aliases](https://github.com/mfyz/dotfiles/blob/master/zsh/.my-aliases.sh)
*   shell configuration files (for go-to tools like vim, tmux...)

I also include a few cheatsheets of keyboard shortcuts or commands for tools like vim for myself.

Running install script doesn’t get everything 100% set up. Or for certain environments, I don’t want to install some of the tools. So for those tools, I have a few more scripts that does the setup work for me.

*   Setup and configure zsh + oh-my-zsh: [https://github.com/mfyz/dotfiles/blob/master/_bootstrap/zsh.sh](https://github.com/mfyz/dotfiles/blob/master/_bootstrap/zsh.sh)
*   Set up Vim plugins: [https://github.com/mfyz/dotfiles/blob/master/_bootstrap/vim.sh](https://github.com/mfyz/dotfiles/blob/master/_bootstrap/vim.sh) (after vim package manager is installed, you still need to open vim and run :PluginInstall command to install all the plugins used in my vimrc).

### SSH settings + Keys

I always manually back up and restore my ~/.ssh folder where I have both ssh configurations as well as all the keys I store on my machine. Most of the keys are backed up to 1password (more than half of them are shared with the team).

### [/private]/etc/hosts file content

I use MAMP Pro to manage my LAMP stack apps and apache/mysql installation. So hosts file is generally automatically populated. But when moving to a new machine I always try to keep a copy of the hosts file so I can easily refer to the hostnames I was working on and the ones I want to restore manually.

### iTerm

Same as Alfred configuration backup and restore.

### CLI Tools

Almost all of my CLI tools are either in homebrew or npm. Homebrew is a popular package manager for macOS. A macOS without homebrew is basically a naked tree. I install almost every developer tool through homebrew. After setting up homebrew, the second thing is to set up nvm (Node Version Manager) and with help of nvm, install a recent/latest node and npm on the machine. There are also a lot of CLI tools I use are basically open-source npm packages. This makes installing these tools super easy. Before I did a fresh install on my Intel Mac, I did document all the global packages and picked the ones that I really use frequently and that become a long command that I ran to install all the tools I was using. So once it’s documented well, installing the packages becomes very easy.

Not so fast on M1! :) I faced various issues on M1 not only nodejs but all around. I didn’t buy my M1 chip MacbookAir right away. I waited some time to transition to M1 because I knew it will be painful for a lot of tools to not fully support M1 and worse, have a lot of issues. My experience was not bad but pretty much every single thing I wanted to install had some workarounds to get it installed right on M1. So you can find yourself trying to search and find what other M1 owners faced on these packages. It may be dependencies you almost don’t care but you will have to deal with, in order to get a tool you need that depends on it.

### Dev Environments

I try to keep my development set up as plain as I can. Also, the nature of my job allows me to be picky and also be able to consolidate my stack. In the last 4-5 years, I was able to get away with the following when I needed to set up my development environment:

*   Web / Back-end
    *   Nodejs
    *   LAMP (using MAMP Pro)
*   Mobile
    *   XCode + Android Studio
    *   Ruby / Fastlane
    *   Cocapods

### Mobile Studios - XCode + Android Studio

XCode is pretty seamless to install. Also, you will be asked and installing xcode developer tools very quickly when you need to install things like homebrew. So that’s all covered.

I don’t actively develop Android apps but I do the test and have some code that I still contribute. So I have to install the Android development environment. I have to say Google made Android Studio tons better to allow setting up an Android development environment very very quickly. Comparably same with XCode. What takes time on the Android side is to pick and download the right SDK, APIs, device emulators, and often each project uses its own Gradle and build tools versions.

After the base tools, setting up iOS Simulator and Android Emulator configuration is something to keep in mind.

I often pick a mobile project for both iOS and Android and try to get them build and run, to make sure everything is ready for my local mobile development work.

I separately also get a react native project up and running. Once the Xcode and Android studio are set up, it’s generally easy to get a react native project up and running quickly. Although I had to deal with some M1-specific issues it was very very easy to tune things up and make sure they work well on M1.

I also noticed both iOS simulator and Android emulators run really really fast on M1 chips. As far as build times, Xcode is visibly fast, Android by default not different but with a few tweaks, I was able to get it twice as fast compared to an Intel machine. It was surprising to see that speed on M1 side.

### VSCode

Getting VSCode restored was relatively easy but not straightforward. I am using the Settings Sync extension which is 3rd party. As of writing this article, VScode still does not fully support settings sync natively (although it’s there but it’s in beta/experimental state and it’s not doing a good job compared to the 3rd party plugin). But the 3rd party plugin I use worked well to restore all settings. Although it failed to install the extensions I was using.

Lucky me, I exported the list of extensions I was using and I was able to manually install them in 15-20 mins.

I used this thread to get the list of extensions I had installed on Intel machine:  
[https://superuser.com/questions/1080682/how-do-i-back-up-my-vs-code-settings-and-list-of-installed-extensions/1452176#1452176](https://superuser.com/questions/1080682/how-do-i-back-up-my-vs-code-settings-and-list-of-installed-extensions/1452176#1452176)

### Sublime Text

I also use Sublime for simpler note-taking and quick editing purposes. The backing up and storing process is the same as the other generic macOS App settings process. See Alfred's section above for more details on how.

### Database connections

I use Table Plus as my database management tool on Desktop and iPad. To export and import all connections (except the ssh keys for the connections behind SSH tunnels).

Here is the help document for Table Plus for exporting and importing connection configuration: [https://docs.tableplus.com/gui-tools/manage-connections#export-and-import-connections](https://docs.tableplus.com/gui-tools/manage-connections#export-and-import-connections)

### Restoring/re-pulling local working copies of the projects

```
const fs = require('fs')  
const path = require('path')  
const { execSync, spawnSync } = require('child_process')  
  
const runCmd = (cmd) => {  
    try {  
        const res = spawnSync(cmd, [], { shell: true })  
        return res.stdout.toString()  
    }  
    catch (err) {  
        return false  
    }  
}  
  
const root = './'  
const ls = fs.readdirSync(root)  
  
const results = []  
ls.forEach((dir) => {  
    if (fs.lstatSync(path.join(root, dir)).isDirectory()) {  
        const result = runCmd(\`cd ${path.join(root, dir)} && git remote -v && cd ..\`, { stdio: 'inherit' })  
        const gitRemote = result && result.split('\t')[1].split(' ')[0]  
        // if (gitRemote && gitRemote.indexOf('ship.nomadinteractive.co') > 0) {  
        results.push([  
            dir,  
            (gitRemote || '-')  
        ])      
        // }  
    }  
})  
  
console.table(results)
```

### .env files

Making sure you backup all of your .env files while you take backup of your old mac. This is probably the most important when you need to restore your local development environment. Documenting and pulling your code from the CVS is the easy part. You will need to re-create from scratch or use the .env files you backed up. Constructing the right credentials again would take extra effort if you are not organizing your credentials in tools like 1password.

## Design apps/tools

I use Figma, sketch, Balsamiq, adobe photoshop and Pixelmator. All of these have to be installed manually since some of them require multiple-step license activation.

## Automatic Dark Mode switch on apps

This is becoming more and more a natively supported capability for most apps but a few of them still don’t automatically switch and/or have a way to set separate themes for their light and dark appearances.

VSCode Auto Dark Extension:  
[https://marketplace.visualstudio.com/items?itemName=LinusU.auto-dark-mode](https://marketplace.visualstudio.com/items?itemName=LinusU.auto-dark-mode)

iTerms Auto Dark Mode Switch:    
[https://gist.github.com/FradSer/de1ca0989a9d615bd15dc6eaf712eb93](https://gist.github.com/FradSer/de1ca0989a9d615bd15dc6eaf712eb93)

Alfred:  
I use an Alfred workflow does the automatic theme switch, to install: `npm install --global alfred-dark-mode`

I hope these would give you a good reference point if you are considering doing a full/clean install or bought a new mac and looking for ways to quickly set things up. I also have most of these documented that I refer to them occasionally.