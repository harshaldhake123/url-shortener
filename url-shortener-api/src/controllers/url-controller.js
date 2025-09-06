

// allow 0-9a-zA-Z ie. 10+ 26+26 characters = 62 characters
export const shorten = (request, response) => {

    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const body = request.body;
    const id = 1234567890;
    let urlId = id;

    const result = [];
    let str = '';
    while (urlId > 0) {
        const remainder = urlId % 62;
        result.push(chars[remainder]);
        urlId = Math.floor(urlId / 62);
        str = str + chars[remainder];
    }
    console.log(result);
    response.send({
        shortUrl: 'www.shortUrl.com/' + str,
        originalUrl: body.longUrl,
        id: id,
        createdOnUtc: Date.now()
    });
};

export const getLongUrl = (_request, response) => {
    response.send('Long url');
};