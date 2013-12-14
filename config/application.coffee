# For an explanation of the steroids.config properties, see the guide at
# http://guides.appgyver.com/steroids/guides/project_configuration/config-application-coffee/

steroids.config.name = "Skeptikai"

# -- Initial Location --
steroids.config.location = "http://localhost/index.html"

# -- Tab Bar --
steroids.config.tabBar.enabled = true
steroids.config.tabBar.tabs = [
  {
    title: "Articles"
    icon: "icons/menu@2x.png"
    location: "http://localhost/index.html"
  },
  {
    title: "Saved"
    icon: "icons/pill@2x.png"
    location: "http://localhost/saved.html"
  },
  {
    title: "Twitter"
    icon: "icons/twitter@2x.png"
    location: "https://twitter.com/skeptikai"
  },
  {
    title: "Videos"
    icon: "icons/youtube@2x.png"
    location: "http://www.youtube.com/user/skeptikai"
  }
]

# steroids.config.tabBar.tintColor = "#000000"
# steroids.config.tabBar.tabTitleColor = "#00aeef"
# steroids.config.tabBar.selectedTabTintColor = "#ffffff"
# steroids.config.tabBar.selectedTabBackgroundImage = "icons/pill@2x.png"

# steroids.config.tabBar.backgroundImage = ""

# -- Navigation Bar --
steroids.config.navigationBar.tintColor = "#00aeef"
steroids.config.navigationBar.titleColor = "#ffffff"
steroids.config.navigationBar.buttonTintColor = "#ffffff"
steroids.config.navigationBar.buttonTitleColor = "#ffffff"

# steroids.config.navigationBar.landscape.backgroundImage = ""
steroids.config.navigationBar.portrait.backgroundImage = "images/skeptikai-logo4.png"

# -- Android Loading Screen
steroids.config.loadingScreen.tintColor = "#8c2f38"

# -- iOS Status Bar --
steroids.config.statusBar.enabled = false
steroids.config.statusBar.style = "default"

# -- File Watcher --
# steroids.config.watch.exclude = ["www/my_excluded_file.js", "www/my_excluded_dir"]

# -- Pre- and Post-Make hooks --
# steroids.config.hooks.preMake.cmd = "echo"
# steroids.config.hooks.preMake.args = ["running yeoman"]
# steroids.config.hooks.postMake.cmd = "echo"
# steroids.config.hooks.postMake.args = ["cleaning up files"]

# -- Default Editor --
# steroids.config.editor.cmd = "subl"
# steroids.config.editor.args = ["."]
