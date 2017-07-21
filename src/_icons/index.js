import AlignSelf_baseline from './self-row-alignItems-baseline'
import AlignSelf_flexCenter from './self-row-alignItems-flex-center'
import AlignSelf_flexEnd from './self-row-alignItems-flex-end'
import AlignSelf_flexStart from './self-row-alignItems-flex-start'
import AlignSelf_stretch from './self-row-alignItems-stretch'
import Col_alignSelf_flexStart from './self-col-alignItems-flex-start'
import Col_alignSelf_flexCenter from './self-col-alignItems-flex-center'
import Col_alignSelf_flexEnd from './self-col-alignItems-flex-end'
import Col_alignSelf_baseline from './self-col-alignItems-baseline'
import Col_alignSelf_stretch from './self-col-alignItems-stretch'

import Background_gradient from './Background_gradient'
import BackgroundPosition_bottom from './BackgroundPosition_bottom'
import BackgroundPosition_bottomLeft from './BackgroundPosition_bottomLeft'
import BackgroundPosition_bottomRight from './BackgroundPosition_bottomRight'
import BackgroundPosition_center from './BackgroundPosition_center'
import BackgroundPosition_left from './BackgroundPosition_left'
import BackgroundPosition_right from './BackgroundPosition_right'
import BackgroundPosition_top from './BackgroundPosition_top'
import BackgroundPosition_topLeft from './BackgroundPosition_topLeft'
import BackgroundPosition_topRight from './BackgroundPosition_topRight'
import BorderAll_selected from './BorderAll_selected'
import BorderBottom_selected from './BorderBottom_selected'
import BorderLeft_selected from './BorderLeft_selected'
import BorderRight_selected from './BorderRight_selected'
import BorderTop_selected from './BorderTop_selected'
import Box_shadow from './Box_shadow'
import Col_alignBaseline from './col-alignItems-baseline'
import Col_alignFlexCenter from './col-alignItems-flex-center'
import Col_alignFlexEnd from './col-alignItems-flex-end'
import Col_alignFlexStart from './col-alignItems-flex-start'
import Col_alignStretch from './col-alignItems-stretch'
import Col_justifyFlexCenter from './col-justifyContent-flex-center'
import Col_justifyFlexEnd from './col-alignItems-flex-end'
import Col_justifyFlexStart from './col-alignItems-flex-start'
import Col_justifySpaceAround from './col-justifyContent-space-around'
import Col_justifySpaceBetween from './col-justifyContent-space-between'
import Icon_alignBaseline from './row-alignItems-baseline'
import Icon_alignFlexCenter from './row-alignItems-flex-center'
import Icon_alignFlexEnd from './row-alignItems-flex-end'
import Icon_alignFlexStart from './row-alignItems-flex-start'
import Icon_alignStretch from './row-alignItems-stretch'
import Icon_justifyFlexCenter from './row-justifyContent-flex-center'
import Icon_justifyFlexEnd from './row-justifyContent-flex-end'
import Icon_justifyFlexStart from './row-justifyContent-flex-start'
import Icon_justifySpaceAround from './row-justifyContent-space-around'
import Icon_justifySpaceBetween from './row-justifyContent-space-between'
import ImageSize_contain from './ImageSize_contain'
import ImageSize_cover from './ImageSize_cover'
import Position_absolute from './Position_absolute'
import Position_fixed from './Position_fixed'
import Position_relative from './Position_relative'
import Text_shadow from './Text_shadow'


export const Icons = {
    row: {
        alignItems: {
            'flex-start': Icon_alignFlexStart,
            'center': Icon_alignFlexCenter,
            'flex-end': Icon_alignFlexEnd,
            'baseline': Icon_alignBaseline,
            'stretch': Icon_alignStretch,
        },
        justifyContent: {
            'flex-start': Icon_justifyFlexStart,
            'center': Icon_justifyFlexCenter,
            'flex-end': Icon_justifyFlexEnd,
            'space-between': Icon_justifySpaceBetween,
            'space-around': Icon_justifySpaceAround,
        }
    },
    col: {
        alignItems: {
            'flex-start': Col_alignFlexStart,
            'center': Col_alignFlexCenter,
            'flex-end': Col_alignFlexEnd,
            'baseline': Col_alignBaseline,
            'stretch': Col_alignStretch,
        },
        justifyContent: {
            'flex-start': Col_justifyFlexStart,
            'center': Col_justifyFlexCenter,
            'flex-end': Col_justifyFlexEnd,
            'space-between': Col_justifySpaceBetween,
            'space-around': Col_justifySpaceAround,
        }
    }
}

export const getIcon = (elementStyle={}, isAlignItems) => {

    const {flexDirection = 'row', alignItems='stretch', justifyContent='flex-start'} = elementStyle;

    let Icon;

    Icon = Icons[flexDirection === 'column' ? 'col' : 'row'];

    if (Icon) {
        Icon = Icon[isAlignItems ? 'alignItems' : 'justifyContent'];
    }

    if (Icon) {
        Icon = Icon[isAlignItems ? alignItems : justifyContent];
    }

    if (typeof Icon !== 'function') {
        Icon = Icon_alignFlexStart;
    }

    return Icon;
}

export default Icons;