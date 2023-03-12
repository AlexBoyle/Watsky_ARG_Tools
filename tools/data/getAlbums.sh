#!bash
_token="BQCLGWdb6fCn35uybiclDAQ1QpB971vZAoQIqOzEOu8_Cyep9kXwk4a1nJrc_BTOLhXFL-WLK6uXKMD6t7zQIPAomVrlHxwmILtYNwmIKSZhSXJ0GpaEN3Wg_dBwFvFHVIOhK31H70Voe91NauGv-zUK73Bu9kz_6_SFKFw3TCr6S2saG_yaBHJIA9NIk0UfUKw2KMWI-hgwHCuPitndUfEs4ikNHTgYiWkibii-tC5KrRs2bOmSdcYtBHfbSefJSoLPal0BkfLTv12JwrXUoKRkerMG_yTuAQeDDxCdfvT01vEgfgMAQ6nuuA"
_album="4aawyAB9vmqN3uQ7FjRGTy"
_albums=(\
"5iw3gsM9ECbKNIZ7EV4zrr INTENTION" \
"1YzsUujBhYJX3zmgqYTCLs Placement" \
"37ng9Mhkp1IMPqYDzEGFtk COMPLAINT" \
"6CcTNttjHJN3WGR5igg4MR x_Infinity" \
"4fHVi5XdjGIeNdmiTccnqX All_You_Can_Do_Live_From_The_Regency" \
"1wugFvREdFZUbm1hocCrMh All_You_Can_Do" \
"4kxbcsTJEJYfxYV0QuAR9T Cardboard_Castles" \
"3YwoD4vO86kUzrtLuy88Aj Watsky" \
"0xi4BOZO3x5F4UuxeJmilY Paper_Nihilist" \
"1v0TnqTWQ3PHKhuu2D9ql6 ROLLIN" \
"4mKAbMw3TNJtu379HK353p AWW_SHiT" \
"1CQey4Nrw6cpOmBxIHJFzw Undermine" \
"0g3DB6tlrX0QsWYpvsbBwe Sloppy_Seconds_(Remix)" \
"6agS83WKyj3NIH7dd7pyPX Advanced_Placement" \
"0tgjAr2VILg9J9podJyTBs Feels_Alright" \
"5W7GZTtgEKdxBmSdkqxYja Fuck_It_Up" \
"7bGXLvHJxGhQckiibx1JQy What_Goes_Up" \
"3EUfkU6y0pJ53SzVfyKQK7 Whitecaps" \
"7HA8kIofyfQLiWa8bKoAZO Limo_4_Emos" \
"7v09VLMBwuj5tc8yYaTVJ4 No_Complaints_No_Conversation")

for (( i=0; i<${#_albums[@]} ; i+=1 )); do
  _trackId=$( echo "${_albums[i]}" | cut -d' ' -f1 )
  _name=$( echo "${_albums[i]}" | cut -d' ' -f2 )
  echo "module.exports = " > "./albums/$_name.js"

  curl -X "GET" "https://api.spotify.com/v1/albums/$_trackId/tracks?market=US"\
  -H "Accept: application/json"\
  -H "Content-Type: application/json"\
  -H "Authorization: Bearer $_token" \
  >> "./albums/$_name.js"

done