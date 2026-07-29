# AbunəBazar — quraşdırma

## 1. Kompüterdə işə sal (istəyə bağlı, yoxlamaq üçün)
```
npm install
npm run dev
```

## 2. Canlıya (production) hazırla
```
npm run build
```
Bu, `dist/` qovluğu yaradır — bu, real saytın faylıdır.

## 3. Yerləşdir (deploy)
Ən sadə yol: bu qovluğu GitHub-a yüklə, sonra Vercel və ya Netlify-da "Import Project" et.
Onlar avtomatik `npm run build` işlədib saytı dərc edir.

## 4. Domain bağla
Hosting panelində "Add Domain" bölməsindən öz domenini (məs. abunebazar.az) əlavə et
və domeni aldığın yerdə DNS qeydlərini onların göstərdiyi kimi dəyiş.
