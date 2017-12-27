# Check if ontap is open from your terminal


## Installation

Install this module globally:

```
npm install -g ontap-cli
```

Or

```
yarn global add ontap-cli
```

## Demo

[![asciicast](https://asciinema.org/a/dBgFreIv8m5qaniIftFnuYeR4.png)](https://asciinema.org/a/dBgFreIv8m5qaniIftFnuYeR4)

## Run

```
ontap-cli
```

If you want to check another venue and not Palermo try `--venue boedo` Ex:

```
ontap-cli --venue colegiales
```

## Commands


```
--full             Get relevant information about the joint
--venue <Joint>    Ex: palermo, colegiales, san telmo, belgrano, retiro or boedo. Default Palermo
-h, --help         Display help
--no-color         Disable colors
--quiet            Quiet mode - only displays warn and error messages
-v, --verbose      Verbose mode - will also output debug messages
```
