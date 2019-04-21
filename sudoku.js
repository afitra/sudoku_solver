"use strict"
function hilang0(arr) {
    var hasil = []
    for (var a = 0; a < arr.length; a++) {
        var cek = true
        if (arr[a] == '0') {
            cek = false
        }
        if (cek == true) {
            hasil.push(arr[a])
        }
    }
    return hasil
}
function cari(str) {
    var arr = []
    var banding = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (var i = 0; i < banding.length; i++) {
        var cek = false
        for (var j = 0; j < str.length; j++) {
            if (banding[i] == Number(str[j])) {
                cek = true
                // var temp = banding[i]
            }
        }
        if (cek == false) {
            arr.push(banding[i])

        }
    }
    return arr
}
function gabung(arr1, arr2) {
    var hasil = []
    for (var a = 0; a < arr1.length; a++) {
        hasil.push(arr1[a])
    }
    for (var b = 0; b < arr2.length; b++) {
        hasil.push(arr2[b])
    }
    return hasil
}
function kecil(arr) {
    var kecil = arr[0]
    if (arr.length == 1) {
        return arr[0]
    } else if (arr.length == 2) {
        if (arr[0] < arr[1]) {
            return arr[0]
        } else {
            return arr[1]
        }
    } else {
        for (var a = 0; a < arr.length; a++) {
            if (arr[a] < kecil) {
                kecil = arr[a]
            }
        }
    }
    return kecil
}
function unik(arr) {
    var hasil = []
    for (var a = 0; a < arr.length; a++) {
        var cek = false
        for (var j = 0; j < hasil.length; j++) {
            if (arr[a] == hasil[j]) {
                cek = true
            }
        }
        if (cek == false) {
            hasil.push(arr[a])
        }
    }
    return hasil
}
// console.log(kecil([2]))
var satu = [1, 2, 3]
var dua = [3, 4, 5, 6]
// console.log(gabung(satu, dua))
// console.log(cari('012367321'))


class Sudoku {
    constructor(board_string) {
        this.ukuran = 9

    }
    display(draw, milliseconds) {
        let start = new Date().getTime();
        console.log(draw);
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
        console.clear();
    }

    solve() {
        var ceksamping = []
        var cekbawah = []
        var cekkotak = []
        var arena = this.board()
        var arrtotal = []
        var perubahan = []
        // console.log(arena)
        let backtrack = false;
        for (var i = 0; i < arena.length; i++) {
            for (var j = 0; j < arena[i].length; j++) {
                cekkotak = []
                cekbawah = []
                ceksamping = []
                // while (vaalidasi == false) {
                if (arena[i][j] == '0') {
                    // console.log(i + '==' + j)
                    var kori = Math.floor(i / 3) * 3
                    var korj = Math.floor(j / 3) * 3


                    for (var k = 0; k < arena.length; k++) {
                        // if (arena[i][k] !== '0') {
                        ceksamping.push(arena[i][k])
                        // }
                        // if (Number(arena[k][i]) > 0) {
                        cekbawah.push(arena[k][j])
                        // }
                    }
                    for (var a = kori; a <= kori + 2; a++) {
                        for (var b = korj; b <= korj + 2; b++) {
                            cekkotak.push(arena[a][b])
                        }
                    }

                    // console.log(cekkotak)
                    var sampingbawah = gabung(ceksamping, cekbawah)
                    arrtotal = hilang0(gabung(sampingbawah, cekkotak))
                    // var validasi=false
                    if (backtrack === false) {
                        var tidakada = cari(arrtotal)
                    }
                    backtrack = false;
                    // console.log(tidakada)
                    if (tidakada[0] == undefined) {
                        if (perubahan.length == 0) {
                            return 'tidak bisa di solve';
                        }
                        //backtrack
                        // arena[i][j] = 'X'
                        // perubahan.push([i, j])
                        if (perubahan[perubahan.length - 1][0].length === 0) {
                            perubahan.pop();
                        }
                        i = perubahan[perubahan.length - 1][1];
                        j = perubahan[perubahan.length - 1][2];
                        arena[i][j] = '0';
                        j--;
                        perubahan[perubahan.length - 1][0].shift();
                        tidakada = perubahan[perubahan.length - 1][0];
                        backtrack = true;
                        // this.display(arena, 300);
                        // console.log(perubahan)
                    } else {
                        arena[i][j] = String(kecil(tidakada))

                        perubahan.push([tidakada, i, j])
                        // this.display(arena, 300);
                    }
                    // console.log(ceksamping + '====' + i + '==' + j)
                    // console.log(cekbawah + '===bawah=' + i + '==' + j)
                    // console.log(cekkotak + '===kotak=' + i + '==' + j)
                    // console.log(tidakada)
                }
            }
            // break
        }
        // }
        // console.log(arena)
        // console.log(perubahan)
        return arena
    }
    board() {
        var arena = []
        var con = 0
        for (var i = 0; i < this.ukuran; i++) {
            var temp = []
            for (var j = 0; j < this.ukuran; j++) {
                temp.push(board_string[con])
                con += 1
            }
            arena.push(temp)
        }
        return arena
    }
}

var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[0]

var game = new Sudoku(board_string)
// console.log(game)
// var cek = this.solve()
// cek.solve()
// console.log(cek)


// game.solve()

console.log(game.solve())