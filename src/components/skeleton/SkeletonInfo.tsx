import React from 'react';
import { SkeletonInfoTitle, SkeletonInfoHeader, SkeletonInfoCircle, SkeletonInfoMini, SkeletonInfoBlock } from './styledComponents.ts';

const Skeleton = () => {
    return (
        <>
            <SkeletonInfoTitle>Please select a movie to see information</SkeletonInfoTitle>
            <div>
                <SkeletonInfoHeader>
                    <SkeletonInfoCircle />
                    <SkeletonInfoMini />
                </SkeletonInfoHeader>
                <SkeletonInfoBlock />
                <SkeletonInfoBlock />
                <SkeletonInfoBlock />
            </div>
        </>
    )
}

export default Skeleton;