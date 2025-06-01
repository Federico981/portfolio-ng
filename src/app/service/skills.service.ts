import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
export interface Skill {
  name: string;
  level: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private skills = new BehaviorSubject<Skill[]>([]);
  skillManagement = this.skills.asObservable(); // creo uno stream osservabile

  constructor(private translate: TranslateService) {
    // this.loadSkills();
    this.loadSkills(); // Prima traduzione
    this.translate.onLangChange.subscribe(() => {
      this.loadSkills(); // Ritraduci quando cambia lingua
    });
  }

  private loadSkills(): void {
    this.translate
      .get(['SKILLS_LEVEL.ADVANCED', 'SKILLS_LEVEL.MID'])
      .subscribe((translations) => {
        console.log('Traduzioni ricevute:', translations);
        this.skills.next([
          {
            name: 'React',
            level: translations['SKILLS_LEVEL.ADVANCED'],
            icon: 'https://velog.velcdn.com/images/hoho_0815/post/7ee846f3-2c07-4ddd-9ead-b5b003549055/image.jpg',
          },
          {
            name: 'Angular',
            level: translations['SKILLS_LEVEL.MID'],
            icon: 'assets/icons/angular.png',
          },
          {
            name: 'React Native',
            level: translations['SKILLS_LEVEL.MID'],
            icon: 'https://miro.medium.com/v2/resize:fit:700/1*C3kxjCrJy-aWSMpe2chfaA.png',
          },
          {
            name: 'Redux',
            level: translations['SKILLS_LEVEL.MID'],
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAACiCAMAAAD84hF6AAABJlBMVEUAAAD///92Srxs5egA2P8A2v8A3v8A3P95TMEA3/96TMLi4uJv6+6JiYlt6OulpaUA4v+srKy8vLwKCgrt7e35+fkAvd8A0vjn5+ckJCQ2Njbz8/PX19fd3d1rQ6plP6EAxekbGxuampoAp8U9JmEAnbkAsNBySLZhztFZWVnGxsYAf5YAan0AZ3qAgICTk5NTNIQAOEIAU2JFK25qampLS0tMMHkAICYAkKopGkESCx0hFDQAhJxaOZAARlMJBg8AExZ0dHQsLCxiYmI0IFMAHiMaECo4I1kALTVHl5kbOTo8PDxMTExfO5cAXG0AO0Y3dXdUs7UWLy9OpqhwqdUWDiMOCRcpWFlAh4kmUFE0cHFj09VKnqAQIiInX1p4MblzfMlorsxan2k8AAASQElEQVR4nO1dCVviSBqOmINEFBBJVBSiXHKoiBeoILa2YtvS3fbY7Ywze/z/P7F15gYSwMBq3n1mB1KVInn96ruTYZgAAQIECBAgQIAAAQIECBAgQIAAAQIE0LG1HI/Ht6d9FaPjurxMsH3t48+uzQGs+viDE8binI6VPd9+FtG24NvPTRxG2ubmlv362fdF29yi5wUSJYBjr2e9C9pS0Xg5ifep5wXW4WmbXs96F7TBu06sIN4evC6AaNvweta7oA1d/xGi7crrAh+dtoeANvfQaSsh2krk+FqpZNyv66XSmvnExHHpeAv8+1Mf2h5Kn/CHra94or7wunvaEq5vxF9ouo3ZQLThG9zHiq5MLCT+unB0vbqwsIp8+2s8ezO6ugr/nVxYLeOpCTBlYYO5gmesfGWYKzxxg0jx1SYyPPsJTNs2XBAPbYDzFpg4PH0TEr4PP8EVZhKItpWrvegCJgoeW1s1OySb9BuaEwdH4nM2EGOK+FjBbk1yjVnWxpFLqJ23iWmL605PCv3REimyFpb96DQocQOz35aEf+c1dOkpzN0eFUMNgDadjLIjbQTb+NTkKuVt27ySA23MMaEL+UOeVaZvMNGWRJptg9zLA9xoSWbPfK+ANnJkYSOZLCXR7c6lUuQWjbQx+4iuLWYNsft1zbKSE23kgpBcp2ZVs5loS8bRZZaIaBDbuoe36D5Dbh7QhqUR6j3wz5ZZLDBtqSPg0CwikcHxOvy0HMVSB34l2p82gyjPqmJjqG5D15zE5gDdyuoGBPyEucI5HsRgHKsdGk9ZHBBM2xH6jDzBFFoJEbigT433p42hmnXfFwJGA7akX9F1riBp0wwABjKiSex9oN0Z3TcR5URbEn+OmlfC+xmnp7YG0Eb2sm9phVFA/DasrNHdr5pvFu9IPBmJTzQ6lDYS2VrtLVLzxBscQNs6nl1++5sfHdTdLWt/YfRJz7zhm8A3i8iN7hmYGUjbvkVoVnSSvhpow14G4hXStpUiLM+s98HotJFIfpFwg//Ux5A9/U+/hsQljqMwqnnWTSSaaCvpgpqA0zf1sQ38s4jYTW1uUhtC8Bzo+QctuMJkANWzheVufesTGAMuPJbDzb3rbZxbihPtt3y8fgQFAtNaxlbARBuDbMBCaWvtemUuuU2sdmr/ehErggXi1C4/rB+l6HVgQ4q585zG8w16TEq8sXXqlGKS5koPc2bEiUtKbyxJDyOYaCuZVooyqTkTFhjLkW3qEC1iDZva6nPVU4dOG/k7A3O67HQnBtqYK+1LWbOXpJ5ios106gbRaCbaTL70CiUa6MNPiGvP6U+/sGi4Zbx1Ng1BUHJPmwNvfI/QxnzVzC1DtiLdUYi2lLb8kSZOSMGXyNdUif7svs4aiOAfKJ00/TerXkgpHo1GiXr/BD9H4yDC2toGgdPqMrWna9HNZKp8xRyDCXGsqK/KK8nV8iLaRdtwdA9HQgm4hrEAuldOJVfK2ySLxCxupJIbYFz72a3F8kIymdqAP8sswsPxdXwiuhjP2eYAAQIECBAgwEfC2vApAWxY1mqFYyJXS0NkTpqTWW9yaF/kL3a/OY+d9hr5fOXA85obc5No82o+SlI4hBCWiieXE1hyUjiQRV7gRV69sI/VCwoYFHgh73XVSdD2/BgmnGFIxdzYa04KB5zACTwvcBwvNDqmobYswsNwUCx4XHYCtB0SQQuHJfA/9Fl6HHfRSUEFzOQrFwVWBAwpVcNIHtAliHKjWi2IrFjxtuz4tLUkvDfTrdxN8yb3GILEhdO/xlx2MqiIHIs1V1XmOSBVHTJQV3hW4PJd9KXBc4q3dcemLYNYCtVutSMnkLhwcbxlJwRZ0OWoCpjilTb6XAEcxrJdOqRyYtXh7P7YGKET0wjMWs1kBG7TkLf0WOtOBl2eYzv61zwgi4f8ZEVOUHr6QIUXsp4WLo9HG9qhRZvP8Qh5a42z8GRQFwXZ+L2nAPXfYKAyK3w2HP/mdZeOR1sOsXZmH4DyJt2MsfJkcGH1LU5VuFEFVrS4HIC2jpeFx6LtEpnNc4eRX3Bg+uotL/BWE1kQWI4VrE6cwnGefN7yOM0HLShTzj5aDg6djL70ZJAX7KpeAazZFJnKCW0vC49D2znUYJk+gxkobyMvPSE40IakzSaDMif2GA9YHoM2KGyh2z6DTamvJPoHsEkttDWAuwZcYLFuPqxyvOXIYCzPjf7kGRS2Wt9RKG79RNEvNHjerMUqMRZYUlngWHNsr3Jcn2DfGWPQdgjVV/9g4E7qYy58RMViSdsCx0O9pnCCapoI/LtTLwvHR291AeIUHhB7Xhanv0uB32YM0k8BXciPO2A53jiQ8Oq3jU7bWWiIawZU3yBa/cBBjFMNX8HmVLCX2zNH723eNG84oiPTdiM5e7oaoA8y5Qiro3C8Hg00RFao9HZ7vd5uuwC2q+5yeA6uorR5xjNq4SEq/1YaqPt8AXAsADmdeqVRkFWOZVlexBBYllNUOXtRheQ1BN4hizkA2yPTBlXbYH8W0jblFHmD5+SswqNcJMdynKABfYUZTJ5X8wonejKkY9AGMx+axr+8q9Vseq5VDE/XJpxWZECOgOiB4sXKcqGQBSgUgPDBI4hOMIMV8p7c3f1Ru4MuoSxR/6JZlMJhKWOrITRrh6OtPgF0qrLAo30pKHL+4gLE72bXF6g3pdrIKooIZwm80nAvcSPTdm7QXOckKz4LKTaCzw1FRFUEVsBsgKjTUjDoAmGD1vS0DrQeD1NxYsGtyI1MGzSkEvn8SCswqOSXaZ3cTdnNZS44SANXqDaIjYTZcatDC45xKMELNupuQ4G1BV52F9EvjtoRf6fTBh1bI8B+BUb2ZHrU1cG+40S1AjjpArqAC3LKcg5VFllAErgrIq+tngWbWoi5Kv5NgrYzKeSAsJSuTYe5BpQ0lew3GZUJsgZ/9vSAunJtHNMXqPtxmucElldcZN72JkAbU9SpkoBtCOtil5lChjcbYwW9tAc8WRlECyzJcHQaSiwWk3fxYB6yCXScSPdvF1YZuOHJkL1RH2M00lajFfnDu7tc7rCVKVLugHn123NrwEKBrsZOgeSdFgRiD7oqNpskKf4Z7OVdRKyGHgtU3FB5G5m2poG2yyIuKutFl9tcK0SZe/Q1UujFLIUC4GfIwGbi4h501hDEBvp+AcRNBdQZ5h+o3PAAdW/UbvhnSBvNUf56BNszZMm93eBKM/g/P31e4GiYw8t6DKZzMZMVkbAGeOygIwrwdi3Zjy4IV4eFWlcjP0QgmRIgtzdNe1h/WwtZxfCtUbengIBXxrFY2GSO0kbz4lVApJWkqjhU3Eah7fIRSlka6rKhU2ukt+HZ86+Mhqpoax+qApcXH+soOm10GnR1LY9bg2mxzuCfGYG25zSSMuDjuqkgn2cktFH71RwmDEBbw3KoDZwKbFhNtJGtDEMs6yLqG9DWJBWEE7fptBw2s/74cLv2DZYXWHpMNWxSzG4bbFJrdas9PNd75JW2JgqiGGxK3ckQ6gkJhfzZpyTQ1HHKsxozeV6jLYbjdhlwaiVaFvhhScsjj+/eOdNidi+1AtRgU/TFEbkA/qopIL/gWc1YAieOChv24+pgULEU+0BEMdRx80obau7AFYLHgbWCy9zJob4vM4Mq0ZOFLJj9MMBKFbhm2Fr2eOy48WoHfVc5vgGifWNupMC7aBL0SBusKFOucoOS3rkQzMDpJgPyJvUvqk4Qpwrwu3Rr2oOKqiLS2ktbjvG8KGax8azGQKD/DczXptdV3tZX4wBvtEF9pgtNuH9a/A5H9wZTC+PWsC+B1mfUVUQFLitA5a/qTH67aFRpLK8gx1bWGmy6WdhyaTXFDrj2RFva1EcERa9PVxEN7vVawjk1JT4gG+O4mIysQAKXCXo8tQFGkOZT4N6ioLSdFYDgKbu2eXZce3kfLCzhhfXIoNm34ahJU0kGaYQOi3Tn/sfGQVWBuSOl0WV6xCEBwbxsnXVAtSCYfNCpqALMU2Y7bn6g5IW2tKXpI9Ovie1Go80wveifuAFBYiFxMVkl8eVn3p6nlGleJCtwqsDDQk3BZbuWF9qQZru0Hqg17c7bedgubUjfhX3Lv3UuFFSVAq5uvtLuwCZnoWuagXPi36oNmUW1QF7Iuu5x++rhLao1WziVxhkOe04tTXXbrfmgrw29vawC3VtAiBhjQRQvyNVer47Q61UrINJS1JgIiy+oGFjpuF/62ANt8LbNIVKTPshhFSIibuZ+ysP+JuSNkACBFX4GBvm5HK3JQ6BiIK4wCxxr7YMbgmPyZikXOHPQTdRiFi0l0nMUv1syJM9hi/i9PQoCX61XsrLKxghPtCiPcryioKiFyi6IJHgXXocBD+5pa9qjAk31W1uPoLGw67G0761bKhdDCi3RbderMP4sEMgwdVlvdzto2i5vLaIOwYP7l/sBjqwJtkNN9ZsDgJzk2GgJlaMvkQJFVzTmMk5ZPfOrckaHpOu1v23d/at1cnbadEfDNPAcco7cD92l6CaHtvlxjt0YS2JTGA0Y7SpPgy+XGI+2W1rak0ymAgWgDpnfnN+Ngta+tQYIOGF6BFa3TGkSrw32n+grBYfDYZMyJ1jczEF6q98jV77TZmt5ho/5tZld0RquFwRvDfZr3miz3XQLlpPNj49iKp2SuSd+6zZ7g70KbGiPM3fuMjBOEN2EohrWkslPw2ch3DqGUue1Vs3k7SLWnIPPR/9psya8uyxsqRGsBiDvkbat5Jxb2qCTNrw7ElXo+2TWHL2St4TDUzDfYCSlWJuPvEpbwgNtLlq/Lx+Rn+s8CyVQ/Kr8Idg3KdNVYJjatRz1qtsAbetu595IVpNpxTnqauiX/YaBqr/PxdhMAlPn8Ca1JN+8WlLGA21DUz8nuHmhDzUn/Z8HfCtURYv3Dx/2ZiswRDVLodfnSQFt7l9RdzjwoeSb9MDOBZS69LlN9Zv5cY5OAT7sfcC0WVO5ARUcVMYTvNCGtlkfdX9LOlH7VRea5hy5TwAxqb754DsGRLnDwH4tnuVVvcyHCw5esFz28MJ5lA+SMvYsRrOFXwYStj83j3GDWPO9bzzPczS6qsvG8koBvheEvpqhLXAOlYYJImd7fQXA82EG97KFpRZJIOXMiaRfrQFuyVsCNl0V2p3P7Yoag+28uoBVWdioW6gedD73WFsX+aRxR/hJ13I3zWbz5ubwMU1fb6R1Tl5mpNBjjsrd5U0LsTqVZ8ArMVYQFAX1z5s34mkWduCLrALLNazVI5k0mmlSAg1Lkv52HtRuSj1Z5IaAkWLxsdV6TBclLKLTeVFDA+d2BVHJdyxD3woCHqQvVXlTHBZtneFhqdjSHLpmWBsPaz284da0XrPVziqxmJrtdRzGuhcFAQw2PCWNRsWvw7RkaAeXAGc3RlJuT4pS2ERquDXt5ztmA2eHtXS6CJAGSs5Bjs5PMsWQhBBKt6b9poHJIvH75eX+/v7l5fuXkc6/PDsbtPPOmwjvSs6+vPyYjxiw8/Ovf6Z9TTOP7zuRyNK8EUuRyPzPP6d9XbOMf+7nLZxp1O38Ne2Lm1n8PR9x4owS93va1zeT+G4ibQnDRNyPp2lf48wh8SNiICgSef0BsTNv1HRL88FONePLa0TjbGnn/s8OHXj6/tOg7yI/p3iNs4c/55coaa8vtq34++cSJTXyYxqXN6P4TeUp8uq8DZ9+ajMC3ij+pKI2/9J3zpedSMCbCU9kh0ZeB0ZSL0TgAv2GkHhdcidGVAFG+svkBwLxPCJ/D52piWUQajHfXbMGgi8smEuvb35Vs46EJ0X/BQQOQMVF7t/4qmYeP5GwLe24nP6v+T9CfyzNL42Whns3eCJuhUsazluhf/8H0vzBvZAfS+5t42UuLUnF/yKiIx9a3J7cq/jzWjEclmrMv/Cu/tDido9FZ2gm7fIOVtelNKwL72Av5CMnypFDMdQeAEGT9CcMfmOqv7/91c0qvrhh4A63cUhpWmhyx/U7xgumbcCMWyxopoek7oee9c6B7OgA7X6TCZHn8YwdWE8uFeK7xcDI/FlrPAiHzN1nyCh83Ejhy/wAFywXos0aUsbSwz1MSN85sAv22nEaO9O6W+z//TgU/X9cmzDo9u9oQ5/DG/3+GkD3BwAyiX022zlpuHXq2PuCHd6PWjX9OwLzQH10VEsyNNya8YQqzx82LL1/3dnZee1nEQ/T/V5V+s8OxODKQ4AAAQIECBAgQIAAAQIECBAgQIAAAf6v8D84c8urU2eepQAAAABJRU5ErkJggg==',
          },
          {
            name: 'HTML/CSS',
            level: translations['SKILLS_LEVEL.ADVANCED'],
            icon: 'assets/icons/html-css.png',
          },
          {
            name: 'JavaScript',
            level: translations['SKILLS_LEVEL.MID'],
            icon: 'assets/icons/javascript.png',
          },
          {
            name: 'TypeScript',
            level: translations['SKILLS_LEVEL.MID'],
            icon: 'assets/icons/typescript.png',
          },
        ]);
      });
  }

  getAllSkills(): Skill[] {
    return this.skills.getValue();
  }
}
