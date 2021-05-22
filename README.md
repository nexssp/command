# @nexssp/command

Easy repetable shell commands... just to save time.. also OS dependent depended. _**See advanced examples below..**_

## Note

This Nexss Programmer's plugin is the effect of the refactoring the Nexss Programmer **@nexssp/cli** which development has been started in 2018. Now this module can be also used **_as separate program_** without the Nexss Programmer.

## Install

```sh
npm i -g @nexssp/command
```

Now you can use `nexssp-command`.

## Usage

Let say you wrote some big command and you do it everyday,.. just very often

```sh
echo 'myexample command which is long and repeatable' && ls && mkdir abc && cd abc && ls && echo 'this can be loooooong..'
```

### Add Commands

```sh
# Below is the same as nexss programmer's `nexss cmd add nameOfCommand "echo ....`
nexssp-command add nameOfCommand "echo 'myexample command which is long and repeatable' && ls && mkdir abc && cd abc && ls && echo 'this can be loooooong..'"
```

### Run Command

```sh
nexssp-command nameOfCommand
nexss cmd nameOfCommand # in the Nexss Programmer
```

### List Commands

This is OS dependent. Please see advanced example below. You can specify different **commands for different OSes**. @nexssp/commands also recognize the different distros..

```sh
nexssp-command list # this will display list of available commands
nexss cmd list # in the Nexss Programmer
```

### Delete commands

```sh
nexssp-command delete # this will display list of available commands
nexss cmd delete # in the Nexss Programmer
```

## There is much more..

### More advanced example

As you can see below you can specify different commands OS and even distro name and version dependent,

```yml
name: Advanced Example of @nexssp/commands
commands:
  win32:
    - name: init
      command: scoop install xpdf-tools
  linux:
    - name: init
      command-ALPINE3: apt-get -y install poppler-utils # specific distro (Alpine 3) more here: https://www.npmjs.com/package/@nexssp/os#distros-list
      command-ARCH: pacman -S --noconfirm xpdf # Like for every version of Arch
      command-UBUNTU: apt install xpdf # specific like below are always first, then global ones.
      command-UBUNTU18: apt install xpdfA
      command-UBUNTU20: apt install xpdfB
      command: apt-get -y install xpdf # this will be correct for distro with xpdf package. For eg. arch will be like above.
  darwin:
    - name: init
      command: brew install xpdf
```
