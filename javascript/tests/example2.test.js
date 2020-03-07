const test = require("ava")
const JAC = require("../")
const papaparse = require("papaparse")

test("example 2.1", t => {
  const json = {
    interface: {
      type: "image_segmentation",
      availableLabels: ["valid", "invalid"],
      regionTypesAllowed: ["bounding-box", "polygon", "point"]
    },
    samples: [
      {
        imageUrl:
          "https://s3.amazonaws.com/asset.workaround.online/example-jobs/sticky-notes/image1.jpg"
      },
      {
        imageUrl:
          "https://s3.amazonaws.com/asset.workaround.online/example-jobs/sticky-notes/image2.jpg"
      }
    ]
  }
  JAC.toCSV(json, {
    rows: ["interface", "samples.0", "samples.1"],
    columns: [".", ".imageUrl", ".output"]
  })
  t.pass("no validation errors")
})

test("example 2.2", t => {
  const json = {
    interface: {
      type: "image_segmentation",
      availableLabels: ["valid", "invalid"],
      regionTypesAllowed: ["bounding-box", "polygon", "point"]
    },
    samples: [
      {
        imageUrl:
          "https://s3.amazonaws.com/asset.workaround.online/example-jobs/sticky-notes/image1.jpg",
        output: [
          {
            color: "hsl(336,100%,50%)",
            points: [
              { x: 0.13557046979865772, y: 0.3030201342281879 },
              { x: 0.10604026845637583, y: 0.38859060402684564 },
              { x: 0.14899328859060404, y: 0.41275167785234895 },
              { x: 0.2040268456375839, y: 0.3795302013422819 },
              { x: 0.31543624161073824, y: 0.3704697986577181 },
              { x: 0.3476510067114094, y: 0.38758389261744963 },
              { x: 0.3651006711409396, y: 0.35838926174496644 },
              { x: 0.48456375838926175, y: 0.35335570469798655 },
              { x: 0.47114093959731546, y: 0.2697986577181208 },
              { x: 0.39731543624161075, y: 0.2697986577181208 },
              { x: 0.36778523489932885, y: 0.3181208053691275 },
              { x: 0.17852348993288591, y: 0.3151006711409396 }
            ],
            regionType: "polygon"
          }
        ]
      },
      {
        imageUrl:
          "https://s3.amazonaws.com/asset.workaround.online/example-jobs/sticky-notes/image2.jpg",
        output: null
      }
    ]
  }

  t.snapshot(
    JAC.toCSV(json, {
      rows: ["interface", "samples.0", "samples.1"],
      columns: [".", ".imageUrl", ".output"]
    })
  )
  t.pass("no validation errors")
})
