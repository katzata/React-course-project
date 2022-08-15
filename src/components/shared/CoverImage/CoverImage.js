// import styles from "./CoverImage.modules.css";

function CoverImage({ data, fit = true }) {
    const baseUrl = `https://images.igdb.com/igdb/image/upload`;
    const styles = {
        width: (data.width ? `${data.width}` : "100%"),
        height: ((data.height || data.width) ? "100%" : "auto"),
        objectFit: !fit ? "scale-down" : "cover"
    };

    return <img 
        src={`${baseUrl}/t_${data.baseSize}/${data.imgeId}.jpg`}
        style={styles}
        alt={data.name + " cover."}
    />
};

export default CoverImage;