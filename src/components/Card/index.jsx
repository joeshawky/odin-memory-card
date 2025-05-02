import { useRef, useState } from "react";
import { IMAGES } from "../../utils/utils";
import "./Card.css";

export default function Card({
    idx,
    image,
    gem,
    onClick,
    shown = true,
    value,
    isShuffling
}) {
    const [cardTransforms, setCardTransforms] = useState({});

    const transformRef = useRef({});
    let animationFrameId = null;

    const handleMouseMovement = (e) => {
        const index = Number(e.currentTarget.dataset.index);
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = (offsetX - centerX) / centerX;
        const y = (offsetY - centerY) / centerY;

        const rotateX = Math.max(-15, Math.min(15, y * 40));
        const rotateY = Math.max(-15, Math.min(15, -x * 40));

        transformRef.current[
            index
        ] = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(() => {
                setCardTransforms({ ...transformRef.current });
                animationFrameId = null;
            });
        }
    };

    const handleMouseLeave = (e) => {
        const index = parseInt(e.currentTarget.dataset.index, 10);
        transformRef.current[index] = "rotateX(0deg) rotateY(0deg)";
        setCardTransforms({ ...transformRef.current });
    };

    const doubleGemDiv = (
        <>
            <div
                className={"gem leftGem"}
                style={{
                    backgroundImage: `url(${shown ? gem : IMAGES.stevenGem})`,
                }}
            ></div>
            <div
                className={"gem rightGem"}
                style={{
                    backgroundImage: `url(${shown ? gem : IMAGES.stevenGem})`,
                }}
            ></div>
        </>
    );

    const singleGemDiv = (
        <div
            className={"gem midGem"}
            style={{
                backgroundImage: `url(${shown ? gem : IMAGES.stevenGem})`,
            }}
        ></div>
    );

    const gemDiv = gem.includes("garnet") ? doubleGemDiv : singleGemDiv;
    return (
        <div className={`card ${isShuffling && 'startAnimation'}`} onClick={() => onClick(value)} style={{}}>
            <div
                className="cardHoverLayer"
                onMouseMove={handleMouseMovement}
                onMouseLeave={handleMouseLeave}
                data-index={idx}
            ></div>

            <div
                className="cardInner"
                style={{
                    transform:
                        cardTransforms[idx] ||
                        "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                    backgroundImage: `url(${image})`,
                }}
            >
                {gemDiv}
            </div>
        </div>
    );
}
