# Privacy and update policy

Status: accepted for the first duoOffice release baseline

## Decision

duoOffice ships without usage telemetry. This means there is no event tracker,
installation UUID, analytics SDK, analytics endpoint, packaged analytics
credential, or settings toggle for usage reporting.

Product metrics may only be reconsidered after a separate design review. Any
future proposal must be opt-in, document its exact event schema and retention
period, use infrastructure controlled by the duoOffice project, and update the
privacy notice before implementation.

## Updates

The canonical update source is the public GitHub Releases feed for
`espilber/duoOffice`. The repository coordinates are committed in the
electron-builder configuration; release builds cannot silently inherit a
private or environment-injected update service.

The desktop shell keeps the inherited update cadence: an initial delayed check
and periodic checks every four hours while the process remains open. Automatic
download is disabled. Download and installation begin only after an explicit
user action in the update window.

The stable channel is the default. Beta is opt-in and can be selected in
Settings. Development and unpackaged builds do not contact the update feed.

GitHub necessarily receives normal HTTPS connection metadata and the update
client information required to resolve a compatible artifact. Update requests
must never include document content, file names, file paths, AI prompts, API
keys, or provider credentials.

## Release requirements

- Publish feed metadata and installers in the same GitHub Release.
- Preserve code signing and artifact verification for each supported platform.
- Never embed a GitHub token in the application; the feed is public.
- Keep automatic download disabled unless a later policy decision changes it.
- Run the privacy boundary audit before publishing a release.
