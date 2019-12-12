# tiltak-stillingstitler
Vi trenger en minimalistisk løsning som gjør stillingstitler 
tilgjengelig på internett med styrkkoder for autocomplete.

## Går mot elastic search

Bruker samme spørring som innenfor [pam-search-api].

### Teste lokalt
For å teste denne applikasjonen lokalt uten å skrive en mock-server 
kan du bruke proxy mot elastic search i test-miljøene, følgende bør
fungere om du har satt opp kubectl.
```
kubectl port-forward -n tpa --context dev-sbs svc/tpa-stilling-opendistro-elasticsearch 9200:9200
```

### Endepunker
Tjenesten tilgjengeliggjør kun ett endepunkt på `/stillingstitler/search?q=direktør`

[pam-search-api]:https://github.com/navikt/pam-search-api/blob/master/src/main/java/no/nav/arbeid/search/api/OntologiService.kt

### Kontakt

`#teamtiltak` på slack.
