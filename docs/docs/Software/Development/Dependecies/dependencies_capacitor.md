# Dependencies Capacitor


## Configurar Deep Links en Capacitor
En tu capacitor.config.json, define el esquema de URL personalizado:

```json
{
  "appId": "com.example.app",
  "appName": "CafeBuy",
  "webDir": "dist",
  "server": {
    "androidScheme": "myapp"
  }
}
```



1. **iOS: Asegúrate de registrar el esquema en Info.plist:**

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>myapp</string>
    </array>
  </dict>
</array>
```

2. **Android: Configura el esquema en AndroidManifest.xml:**

```xml
<activity ...>
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="myapp" />
  </intent-filter>
</activity>
```