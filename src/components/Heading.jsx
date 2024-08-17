/* eslint-disable react/prop-types */

const Heading = ({title, style
}) => {
    return (
        <h1 className={`text-[#6A6D7C] text-[32px] leading-[37px] raleway-semibold ${style}`}>{title}</h1>
    )
}

export default Heading