import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'

export default function() {
  return {
    name: 'vite-load-assets',
    enforce: 'post',
    buildStart() {

    },
    writeBundle(bundle) {
      // 在生成的入口文件中添加导入样式文件的代码
      const styleFilePath = path.resolve(bundle.dir, 'style.css')
      fse.pathExists(styleFilePath, (_err, exists) => {
        if (exists) {
          const entryFilePath = path.resolve(bundle.dir, 'index.js')
          fs.appendFile(entryFilePath, "import './style.css';", () => {})
        }
      })
    }
  }
}
