# ft_transcendence (Game part)
> Recreate the first ever video game. Pong game! \
> Status: Ongoing

<img src="./images/pong-engine.png.png" alt="Alt text" title="Final product" style="display: inline-block; margin: 0 auto; max-width: 400px">

Table of contents
=================

<!--ts-->
   * [About the project](#About)
   * [Installation](#Installation)
   * [Structure of the project](#Structure-of-the-project)
   * [Code overview](#Code-overview)
   * [Keyboard](#Keyboard)
   * [Result](#Results)

<!--te-->
<br> </br>

Game's socket connection (gateway.ts file)
---

Any user connects. The difference is that authorized user can store his scores and etc. 


```typescript
   handleConnection(@ConnectedSocket() socket: Socket) {

   }
```
