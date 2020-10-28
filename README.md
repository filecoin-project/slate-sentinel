# slate-sentinel

An API to access live data from a synced Lotus node on the Filecoin Network through a read-only postgres database.

### Environment Variables

To use this you need the following environment variables.

```sh
POSTGRES_ADMIN_PASSWORD=XXX
POSTGRES_ADMIN_USERNAME=XXX
POSTGRES_HOSTNAME=XXX
POSTGRES_DATABASE=XXX
POSTGRES_PORT=XXX
SOURCE=shovel
```

### Run the server

```sh
npm install
npm run dev
```
