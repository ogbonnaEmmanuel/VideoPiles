import os

from django.core.files.uploadedfile import TemporaryUploadedFile
from django.http import JsonResponse, HttpResponse, Http404
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from VideoPiles.video_editor import VideoDivision


def index(request):
    return render(request, 'index.html')


@csrf_exempt
def process_video(request):
    if request.method == 'POST':
        max_division = request.POST['max_division']
        video_file = request.FILES['video_file']
        file_path = TemporaryUploadedFile.temporary_file_path(video_file)
        dir_name = os.path.split(file_path)[0]
        clip_video = VideoDivision(file_path, int(max_division), dir_name)
        zip_file_path = clip_video.inter_and_build_sub_clip()
        return JsonResponse({
            'file_path': zip_file_path

        })
    raise Http404


@csrf_exempt
def download_video(request):
    file_path = request.POST['zip_file_path']
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/force-download")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            print(response)
            print(file_path)
            return response
    raise Http404
