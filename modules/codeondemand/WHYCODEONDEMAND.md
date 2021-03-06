# Why Code on demand?

### Cross time versioning / data representation changes
As we move through time often the server wants to change the data representation. For example it might want to add new fields (easy), change
a field name (hard), 'pull' fields into a child object or a list of objects (extreme). This can be so painful (because of the tight coupling between
multiple clients and the server) that the work slows down. One high street name company I worked with locked down these changes to 'every 9 months'
just because of the extreme pain of keeping this coupling.

This approach says 'use rest... use media types'. The client is coupled only to the media type (changes extremely slowly if at all), and the server
knows which code to deliver for the data it is delivering. This means (for example) multiple servers can each be delivering different versions
(during deployment/experimentation/rollback) and the client just uses 'the right code for the data'

### Geographic specific versions
The server can deliver a geographic specific version of things:
* Login. In belgium there is a legal requirement of banks to use a card reader, in other countries username and password is adequate
* Address. In switzerland postcodes have 4 digits and the canton is an important part of the address. In america we use zip codes, and in china the order of display is inverted

### Branded components
When white labeling we might want to deliver different components, not just different css. For example one company has an advert server, a second one
doesn't want adverts at all. One company wants very simple components, and a different one has lots of images in it's drop downs.

### Experimentation
If the client is tightly coupled to the server (the usual situation is the client understands the json coming from APIs),
then it can be challenging to undertake experiments. The client needs to 'know' about the experiments and be modified to support them.
