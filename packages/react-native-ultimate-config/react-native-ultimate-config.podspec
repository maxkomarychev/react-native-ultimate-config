require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-ultimate-config"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/maxkomarychev/react-native-ultimate-config"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "Your Name" => "maxkomarychev@gmail.com" }

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/maxkomarychev/react-native-ultimate-config.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift,cpp}"

  install_modules_dependencies(s)
end
