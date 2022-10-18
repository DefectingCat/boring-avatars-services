## Boring avatars service

Fork from [https://github.com/hihayk/boring-avatars-service](https://github.com/hihayk/boring-avatars-service).

Build with TypeScript.

### Variants

You can use one of the variants `marble`, `beam`, `pixel`, `sunset`, `ring` or `bauhaus`.

```
https://api.rua.plus/avatar/beam
```

![Avatar using marble variant](https://api.rua.plus/avatar/beam)

### Custom size

```
https://api.rua.plus/avatar/marble/40

```

![Avatar of 120px](https://api.rua.plus/avatar/marble/40)

```
https://api.rua.plus/avatar/marble/160

```

![Avatar of 120px](https://api.rua.plus/avatar/marble/120)

### Custom colors

You can pass an array of colors using the parameter `color`

```
https://api.rua.plus/avatar/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51
```

![Avatar for Maria Mitchell](https://api.rua.plus/avatar/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51)

### Square avatars

Use the parameter `square` to get square-shaped avatars.

```
https://api.rua.plus/avatar/marble/120/Maria%20Mitchell?square
```

![Square avatar for Maria Mitchell](https://api.rua.plus/avatar/marble/120/Maria%20Mitchell?square)

### Name

You can use a `username`, `email` or any random text to generate a unique `avatar`.

```
https://api.rua.plus/avatar/marble/120/Maria%20Mitchell
```

![Avatar for Maria Mitchell](https://api.rua.plus/avatar/marble/120/Maria%20Mitchell)

### Random avatar

If you just want to use random avatars without providing usernames, you can use the root endpoint. You will receive an `svg` image with a 80\*80px size using the `marble` variant.

```
https://api.rua.plus/avatar/
```

![Random avatar](https://api.rua.plus/avatar/)
