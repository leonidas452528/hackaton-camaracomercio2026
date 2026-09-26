# Subir las actualizaciones a GitHub

Configuración comprobada el 25 de septiembre de 2026 en este equipo:

| Elemento | Valor |
|---|---|
| Carpeta | `/home/ijoan/proyectos/hackaton-camaracomercio2026` |
| Rama de trabajo | `propuesta-cali-activa` |
| `origin` | `https://github.com/helynecheverry/hackaton-camaracomercio2026.git` |
| `upstream` | `https://github.com/leonidas452528/hackaton-camaracomercio2026.git` |
| Rama principal de `upstream` | `main` |

Los cambios de esta entrega se guardan en commits locales. Para subirlos, abre una terminal y ejecuta:

```bash
cd /home/ijoan/proyectos/hackaton-camaracomercio2026
git status
git push -u origin propuesta-cali-activa
```

`git status` permite revisar si quedan cambios sin commit. El push sube los commits de esta rama **al fork de helynecheverry**. El nombre de la rama se conserva aunque el producto ahora se llame Territorio Preparado.

## Incorporarlos al repositorio de leonidas452528

Después de que el push termine correctamente, abre:

[Comparar la rama del fork con el repositorio principal](https://github.com/leonidas452528/hackaton-camaracomercio2026/compare/main...helynecheverry:hackaton-camaracomercio2026:propuesta-cali-activa?expand=1)

Comprueba estos valores:

- Repositorio de destino: `leonidas452528/hackaton-camaracomercio2026`, rama `main`.
- Repositorio de origen: `helynecheverry/hackaton-camaracomercio2026`, rama `propuesta-cali-activa`.

Si ya existe un pull request de esa rama, el push lo actualiza automáticamente; revisa ese PR. Si no existe, pulsa **Create pull request**. Título sugerido: **Territorio Preparado: prototipo, alcance y presentación**.

Subir al fork y abrir un pull request no equivale a fusionarlo con `main`. La incorporación al repositorio principal se completa al revisar y fusionar el PR con los permisos correspondientes.

## Si tienes permiso de escritura directo en el repositorio principal

Como alternativa al flujo por fork, puedes subir la rama allí:

```bash
git push -u upstream propuesta-cali-activa
```

Esto crea o actualiza esa rama en `leonidas452528`; tampoco fusiona automáticamente con `main`. No es necesario ejecutar las dos alternativas.

## Si GitHub rechaza el acceso

Un error `403` o `Permission denied` requiere revisar la cuenta autenticada y su acceso al remoto indicado. No se resuelve con un push forzado. Si usas GitHub CLI, puedes comprobar la cuenta y configurar la autenticación con:

```bash
gh auth status
gh auth login
gh auth setup-git
```

Estos comandos requieren tener `gh` instalado. Sigue su flujo de inicio de sesión en el navegador; no pegues contraseñas ni tokens en archivos del repositorio.

## Para cambios futuros

El push solo sube commits. Revisa primero `git status` y `git diff`, añade únicamente los archivos deseados con `git add ruta/del/archivo` (sustituye la ruta por una real), crea un commit con `git commit -m "Descripción del cambio"` y repite el push a `origin`.

Esta guía no ejecuta un push ni publica cambios por sí misma.
