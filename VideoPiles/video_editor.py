import os
import secrets
import zipfile

os.environ["IMAGEIO_FFMPEG_EXE"] = "/usr/bin/ffmpeg"
from moviepy.editor import VideoFileClip


class VideoDivision:
    def __init__(self, video_name, max_division, dir_name):
        self.duration = VideoFileClip(video_name).duration
        self.max_division = max_division
        self.video_name = video_name
        self.dir_name = dir_name
        self.file_names = []

    def calculate_division(self):
        sub_clip_size = float(self.duration / self.max_division)
        return sub_clip_size

    def inter_and_build_sub_clip(self):
        previous_sub_clip = 0
        current_sub_clip = float(self.duration / self.max_division)
        for x in range(self.max_division):
            split_name = self.video_name.split('.')
            new_name = f'{split_name[0]}_{x}.mp4'
            self.file_names.append(new_name)
            clip = VideoFileClip(self.video_name).subclip(previous_sub_clip, current_sub_clip)
            clip.write_videofile(new_name)
            clip.close()
            previous_sub_clip = current_sub_clip
            current_sub_clip += current_sub_clip
        zip_file_path = self.create_zip_folder()
        return zip_file_path

    def create_zip_folder(self):
        zip_name = secrets.token_hex(8) + '.zip'
        zip_path = os.path.join(self.dir_name, zip_name)
        with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as file_zip:
            for files in self.file_names:
                file_zip.write(files)
        return zip_path
