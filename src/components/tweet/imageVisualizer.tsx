interface ImageVisualizerProps {
    id?: string,
    name?: string,
    url?: string
}

const ImageVisualizer = (props: ImageVisualizerProps) => {
    return (
        <div className="pt-3">
            <div className="font-semibold pb-2">Movie: {props?.id || props?.name}</div>
            {
                props.url ?
                    <div className="px-2">
                        <img className="rounded-2xl" src={props.url} alt="" />
                    </div>
                    : <></>
            }
        </div>
    )
}

export default ImageVisualizer