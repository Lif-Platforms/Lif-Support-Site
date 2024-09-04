'use client'

import { useEffect, useRef } from "react";
import styles from "./filters.module.css";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

export default function Filters({ search }) {
    const ringerCheckBoxRef = useRef();
    const daylyCheckBoxRef = useRef();

    // Get filters from URL
    const searchParams = useSearchParams();
    const filters = searchParams.get('filters');

    // Create router instance
    const router = useRouter();

    // Fill in selected search filters
    useEffect(() => {
        // Check if filters were provided
        if (filters) {
            // Parse filers
            const search_filters = filters.split(",");

            // Reset filters
            ringerCheckBoxRef.current.checked = false;
            daylyCheckBoxRef.current.checked = false;

            // Select filters
            search_filters.forEach((filter) => {
                if (filter === "Ringer") {
                    ringerCheckBoxRef.current.checked = true;

                } else if (filter === "Dayly") {
                    daylyCheckBoxRef.current.checked = true;
                }
            })

        } else {
            // Select all if no filters provided
            ringerCheckBoxRef.current.checked = true;
            daylyCheckBoxRef.current.checked = true;
        }
    }, [filters]);

    function handle_apply() {
        let filters = "";

        const ringer_filter = ringerCheckBoxRef.current;
        const dayly_filter = daylyCheckBoxRef.current;

        console.log(ringer_filter.checked)
        console.log(dayly_filter.checked)

        if (ringer_filter.checked) {
            filters += "Ringer,";
        }

        if (dayly_filter.checked) {
            filters += "Dayly,";
        }

        // Apply filters
        router.push(`/search/${search}?filters=${filters}`);
    }

    return (
        <div className={styles.search_filters}>
            <span>Software:</span>
            <input ref={ringerCheckBoxRef} type="checkbox" name="Ringer" value="Ringer" />
            <label>Ringer</label>
            <input ref={daylyCheckBoxRef} type="checkbox" name="Dayly" value="Dayly" />
            <label>Dayly</label>
            <a onClick={() => handle_apply()}>Apply Filters</a>
        </div>
    )
}