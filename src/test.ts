import { runTests, assertEq } from "absolute_unit_test";
import { RustMap } from "./index";

runTests(
    class {
        "Retain should remove the correct elements"() {
            const m = new RustMap<string, number>([
                ["one", 1],
                ["two", 2],
                ["three", 3],
                ["four", 4],
                ["five", 5],
                ["six", 6],
                ["seven", 7],
            ]);

            assertEq(m.size, 7);

            // Remove all the entries that have odd values.
            m.retain((_key, value) => value % 2 === 0);

            assertEq(m.size, 3);
        }

        "Entry should return the origin value if it already existed"() {
            const m = new RustMap<string, number>();

            m.set("key", 40);

            const v = m.entry("key").orInsert(10);

            assertEq(v, 40);
        }

        "Entry should return the new value if it was empty"() {
            const m = new RustMap<string, number>();
            const v = m.entry("key").orInsert(10);

            assertEq(v, 10);
        }

        "get should the same value as entry"() {
            const m = new RustMap<string, number>();
            const v = m.entry("key").orInsert(10);

            assertEq(v, 10);
            assertEq(m.get("key")!, 10);
        }
    },
);
