from io import BytesIO
from PIL import Image

def resizeImage(image, size=300):
    img = image.convert('RGB')
    length = 300
    if img.size[0] < img.size[1]:
        resized_image = img.resize((length, int(img.size[1] * (length / img.size[0]))))
        required_loss = (resized_image.size[1] - length)
        resized_image = resized_image.crop(
            box=(0, required_loss / 2, length, resized_image.size[1] - required_loss / 2))
    else:
        resized_image = img.resize((int(img.size[0] * (length / img.size[1])), length))
        required_loss = resized_image.size[0] - length
        resized_image = resized_image.crop(
            box=(required_loss / 2, 0, resized_image.size[0] - required_loss / 2, length))
    img = resized_image
    return img