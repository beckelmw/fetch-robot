/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { STANDARD_REQUEST_OPTIONS } from '../constants';
import { serializeHeaders, deserializeHeaders } from '../serdes';
import { extractKeysByArray } from '../util';

export function serializeRequest(options : ?FetchOptionsType) : SerializedRequestType {

    let result = extractKeysByArray(options, STANDARD_REQUEST_OPTIONS);

    if (result.method) {
        result.method = result.method.toLowerCase();
    }

    if (options && options.headers) {
        result.headers = serializeHeaders(options.headers);
    }

    return result;
}

export function deserializeResponse(response : SerializedResponseType) : ZalgoPromise<Response> {
    return response.text().then(text => {
        const options = {
            status:     response.status,
            headers:    deserializeHeaders(response.headers)
        };

        if (response.statusText) {
            options.statusText = response.statusText;
        }

        return new window.Response(text, options);
    });
}
