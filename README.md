# tag-stillingstittel
Vi trenger en minimalistisk løsning som gjør stillingstitler 
tilgjengelig på internett med styrkkoder for autocomplete.

## Går mot `pam-search-api`

Feks slik:
https://pam-search-api.nais.oera.no/ontologi/stillingstittelStyrkFilter?text=statsminister

https://github.com/navikt/pam-search-api/blob/master/src/main/java/no/nav/arbeid/search/api/OntologiService.kt

```
STILLINGESBACKEND_URL: http://tpa-stilling-opendistro-elasticsearch.tpa:9200
```

kubectl port-forward -n tpa --context dev-sbs svc/tpa-stilling-opendistro-elasticsearch 9200:9200
