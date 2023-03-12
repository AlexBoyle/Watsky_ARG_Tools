# import required libraries
import cv2

# Read two images. The size of both images must be the same.
img1 = cv2.imread('1.png')
img2 = cv2.imread('2.png')

# compute bitwise XOR on both images
img = cv2.bitwise_xor(img1,img2)
cv2.imwrite('a.png', img) 
# display the computed bitwise XOR image
#cv2.imshow('Bitwise XOR Image', xor_img)
#cv2.waitKey(0)
#cv2.destroyAllWindows()