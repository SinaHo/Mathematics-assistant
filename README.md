# Mathematics-teaching-assistant   
### Made with HTML5-CSS3-JS   
You can use it with just a browser or for a better experience use `electron-packager`.  

**Some texts are in Persian, just ignore them**.
 #### Step Zero: Install node.js and npm :    
 ```
 sudo [apt/yum/pacman/rpm/flatpak/snap] install node.js && nodejs-legacy && npm 
 (sudo) npm install electron-packager
 ```    
 Of course you can create binary installation file e.g. use `electron-packager-debian` to create `.deb` file for Debian based distros. Just replace `electron-packager` with `electron-packager-debian` in above code.     
 
 #### Step One: Package application:    
 1. open a terminal window and `cd` to path of source. In this example we use `/home/user/apps/math/` as path which this `README.md` file will be found there.       
 ```
 cd /home/user/apps/math/
 electron-packager ./  --platform=[your platform] --arch=[your architecture] --electron-version=[electron version]
 ```    
 As a simple way you can run files which their name starts with `make`.    
 
