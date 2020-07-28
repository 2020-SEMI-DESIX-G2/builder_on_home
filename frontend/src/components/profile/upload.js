import React, { Component } from 'react';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

class Upload extends Component {
    constructor(props) {
        super(props);
        

    }

    render() {
        const UPLOAD_FILE = gql`
        mutation UpdateAvatar($file: Upload!) {
            UpdateAvatar(file: $file) {
            filename
            }
        }
        `;
        return (
            <Mutation mutation={UPLOAD_FILE}>
                {uploadFile => (
                    <input type="file"
                        required
                        onChange={({ target: { validity, files: [file] } }) =>
                            validity.valid && uploadFile({ variables: { file } })
                        } />
                )}
            </Mutation>
        );
    }
}

export default Upload;