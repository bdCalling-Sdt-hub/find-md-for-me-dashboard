/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet'

const MetaTag = ({title}) => {
    return (
        <Helmet>
            <title> {`Find a MD 4 Me - ${title}`}</title>
        </Helmet>
    );
}

export default MetaTag;