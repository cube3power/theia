/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import URI from 'vscode-uri/lib/umd';
import * as theia from '@theia/plugin';
import * as types from '../types-impl';
import { DocumentsExtImpl } from '../documents';
import { Position } from '../../api/plugin-api';
import { SignatureHelp } from '../../api/model';

export class SignatureHelpAdapter {

    constructor(
        private readonly delegate: theia.SignatureHelpProvider,
        private readonly documents: DocumentsExtImpl) {

    }

    provideSignatureHelp(resource: URI, position: Position): Promise<SignatureHelp | undefined> {
        const documentData = this.documents.getDocumentData(resource);
        if (!documentData) {
            return Promise.reject(new Error(`There are no document for  ${resource}`));
        }

        const document = documentData.document;
        const zeroBasedPosition = new types.Position(position.lineNumber - 1, position.column - 1);

        return Promise.resolve(this.delegate.provideSignatureHelp(document, zeroBasedPosition, undefined));
    }

}
