const maximum_file_size = 5;
const video_type_required = {mp4: 'mp4', mpeg4: 'mpeg4'};
const maximum_pile = 5;
let error_type = '';

const error_msg = {
    file_size_error: `file size is greater than ${maximum_file_size}mb`,
    invalid_video_error: 'video type not supported',
    invalid_pile_error: `pile number is greater than ${maximum_pile}`,
    empty_pile_error:'please fill in pile number',
}

const CALCULATE_FILE_SIZE = (file_size => {
    let user_file_size = Math.round(file_size / (1024 * 1024));
    if (user_file_size > maximum_file_size) {
        error_type = error_msg.file_size_error;
    }
})


const VALIDATE_VIDEO_TYPE = ((video_type) => {
    let user_video_type = video_type.split('/')[1];
    if (!(user_video_type in video_type_required)) {
        error_type = error_msg.invalid_video_error;
    }
})

const VALIDATE_PILE_INPUT = (pile_input) =>{
    if(pile_input > maximum_pile){
        error_type = error_msg.invalid_pile_error;
    }else if(pile_input === ''){
        error_type = error_msg.empty_pile_error;
    }
}

export const VALIDATE_VIDEO = (video_type, video_size,pile_input) => {
    CALCULATE_FILE_SIZE(video_size);
    VALIDATE_VIDEO_TYPE(video_type);
    VALIDATE_PILE_INPUT(pile_input);
    return error_type;
}