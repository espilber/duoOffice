# duoOffice Privacy

Last updated: August 31, 2026

duoOffice opens, edits, and saves documents locally. Document editing does not
upload files to duoOffice or to a duoOffice-operated server.

## Usage reporting

duoOffice does not collect or transmit usage statistics. The application has
no telemetry endpoint, install identifier, event tracker, or analytics consent
setting.

## AI providers

AI features require a network connection and run only when you invoke them.
Requests are sent directly to the provider and endpoint you configure. Their
contents can include your prompt and the document context required to perform
the requested action. The selected provider's privacy policy and retention
terms apply.

API keys are stored locally using the operating system's credential storage
where supported. duoOffice does not proxy AI requests through a duoOffice or
GenSpark service.

## Update checks

Packaged builds check the public `espilber/duoOffice` GitHub Releases feed for
updates. The first check runs shortly after launch and later checks run
periodically while the app is open. The app does not download or install an
update until the user explicitly chooses to do so.

As the HTTPS recipient, GitHub receives the connection's public IP address,
standard transport metadata, and the information needed to select a compatible
release, such as the installed version, platform, architecture, and selected
stable or beta channel. duoOffice sends no document content in an update check.

Source and unpackaged development builds do not perform update checks.
